// ============================================================
// content/main.js — Chess.com+ content script entry point
//
// Structure:
//   colors.js   -> color conversion tools (hex/rgb/hsl, button tones)
//   masking.js  -> hiding/masking engine and DOM observer
//   main.js     -> state, CSS variables, color animation, events
//
// Colors are written to the html element as CSS variables; the actual
// rules live in content.css. Color changes transition smoothly with a short
// animation (the board's conic-gradient cannot use plain CSS transitions,
// so transitions are computed frame by frame with requestAnimationFrame).
//
// Important: the data-cplus-* attributes are the keys to the style rules.
// If an attribute is removed mid-transition the rule stops applying and the
// animation becomes invisible; removal therefore happens only when the
// related animation finishes.
// ============================================================

// ---------- Constants and state ----------

const DEFAULTS = {
  bg: "#1e1e1e",     // the site default recognized by the extension
  light: "#ebecd0",
  dark: "#739552",
  button: "#81b64c", // Chess.com primary button green
};
const KEYS = ["bg", "light", "dark", "button"];
const ANIMATION_MS = 450;

// Hide toggles from Extra Settings; absent = off
const HIDE_KEYS = [
  "hideOppName", "hideOppRating", "hideOppFlag", "hideOppAvatar",
  "streamer", "hideSelfRating",
];
// Masking data (text): opponent lists + the user's own streamer values
const MASK_DATA_KEYS = ["pseudoNames", "avatarUrls", "selfName", "selfAvatarUrl"];

let colors = {};       // current color values from storage; absent = default
let hideSettings = {}; // hide toggles (boolean) + masking texts

// ---------- CSS variable and attribute management ----------

const root = document.documentElement;
const varName = (key) => `--cplus-${key}`;
// light and dark share the same style rule (html[data-cplus-board] .board),
// so they use a single common attribute.
const attrName = (key) =>
  key === "light" || key === "dark" ? "data-cplus-board" : `data-cplus-${key}`;
const currentColor = (key) => root.style.getPropertyValue(varName(key)).trim();

function setVar(key, hex) {
  root.style.setProperty(varName(key), hex);
  // When the button color changes, luminance-aware helper tones are derived too
  if (key === "button") {
    const { hi, hi2, lo, text } = deriveButtonTones(hex);
    root.style.setProperty("--cplus-button-hi", hi);
    root.style.setProperty("--cplus-button-hi2", hi2);
    root.style.setProperty("--cplus-button-lo", lo);
    root.style.setProperty("--cplus-button-text", text);
  }
}

function setAttr(key, on) {
  if (on) root.setAttribute(attrName(key), "");
  else root.removeAttribute(attrName(key));
}

// ---------- Color animation ----------

const animations = new Map(); // key -> requestAnimationFrame id

function stopAnimation(key) {
  const raf = animations.get(key);
  if (raf !== undefined) {
    cancelAnimationFrame(raf);
    animations.delete(key);
  }
}

// Smooth transition from the current color to the target; onDone runs when
// finished. If the color already equals the target, onDone is called without
// animating.
function animateTo(key, target, onDone) {
  stopAnimation(key);

  const from = currentColor(key);
  if (from === target) {
    if (onDone) onDone();
    return;
  }

  const [fr, fg, fb] = hexToRgb(from);
  const [tr, tg, tb] = hexToRgb(target);
  const start = performance.now();

  const step = (now) => {
    const t = Math.min((now - start) / ANIMATION_MS, 1);
    const k = easeOut(t);
    setVar(key, rgbToHex([fr + (tr - fr) * k, fg + (tg - fg) * k, fb + (tb - fb) * k]));
    if (t < 1) {
      animations.set(key, requestAnimationFrame(step));
    } else {
      animations.delete(key);
      if (onDone) onDone();
    }
  };

  animations.set(key, requestAnimationFrame(step));
}

// ---------- Color application ----------

let baselineReady = false;

// Fills in the initial values of the variables on first run, so no
// transition ever lacks a "from" color and no animation is skipped. For the
// background the site's real color is read; if unavailable, the default is
// used. Since variables have no effect without their attribute, these do
// not change the page.
function ensureBaseline() {
  if (baselineReady) return;
  baselineReady = true;

  const siteBg = cssColorToHex(getComputedStyle(document.body).backgroundColor);
  setVar("bg", siteBg || DEFAULTS.bg);
  for (const key of KEYS) {
    if (key !== "bg") setVar(key, DEFAULTS[key]);
  }
}

// Updates all color keys according to the values in "colors". Activation
// happens immediately; deactivation (reset) happens when its animation ends.
function applyColors() {
  ensureBaseline();

  // bg and button use their own attributes
  for (const key of ["bg", "button"]) {
    const active = Boolean(colors[key]);
    if (active) setAttr(key, true);
    animateTo(key, colors[key] || DEFAULTS[key], () => setAttr(key, active));
  }

  // Board: light/dark share an attribute; the attribute is synced to the
  // target state by whichever animation finishes last.
  const boardActive = Boolean(colors.light || colors.dark);
  if (boardActive) setAttr("light", true);
  const syncBoardAttr = () => {
    if (!animations.has("light") && !animations.has("dark")) {
      setAttr("light", boardActive);
    }
  };
  animateTo("light", colors.light || DEFAULTS.light, syncBoardAttr);
  animateTo("dark", colors.dark || DEFAULTS.dark, syncBoardAttr);
}

// ---------- Source events ----------

function load() {
  chrome.storage.sync.get([...KEYS, ...HIDE_KEYS, ...MASK_DATA_KEYS]).then((stored) => {
    colors = stored;
    for (const key of HIDE_KEYS) hideSettings[key] = Boolean(stored[key]);
    for (const key of MASK_DATA_KEYS) {
      // Safely ignores incorrectly stored boolean values from the past
      hideSettings[key] = typeof stored[key] === "string" ? stored[key] : "";
    }
    // Operations requiring document.body run once the DOM is ready
    if (document.body) {
      applyColors();
      applyHiding();
      startHideObserver();
    } else {
      document.addEventListener("DOMContentLoaded", () => {
        applyColors();
        applyHiding();
        startHideObserver();
      }, { once: true });
    }
  });
}

load();

// Instant preview from the popup: sent while moving in a color picker (value: null = reset)
chrome.runtime.onMessage.addListener((msg) => {
  if (msg && msg.type === "preview" && KEYS.includes(msg.key)) {
    colors = { ...colors, [msg.key]: msg.value };
    applyColors();
  }
  if (msg && msg.type === "hide" && (HIDE_KEYS.includes(msg.key) || MASK_DATA_KEYS.includes(msg.key))) {
    // If a list changed, drop the old name/avatar assignments so they are redealt
    if (msg.key === "pseudoNames") pseudoMap.clear();
    if (msg.key === "avatarUrls") avatarMap.clear();
    hideSettings[msg.key] = msg.value;
    applyHiding();
  }
});

// Changes saved in another tab or in the popup
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync") load();
});