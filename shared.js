// ============================================================
// shared.js — Common code for the popup pages (Settings+, Themes, Extra)
// Sections: Color tools · Color settings · Hide settings
// Note: the content script runs in a separate context; its copy of these
// helpers lives in content/colors.js.
// ============================================================

// ---------- Color tools ----------

// "#rrggbb" / "#rgb" -> [r, g, b] (0-255)
function hexToRgb(hex) {
  let h = hex.trim().replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

// [r, g, b] -> "#rrggbb"
const rgbToHex = ([r, g, b]) =>
  "#" + [r, g, b].map((x) => Math.round(x).toString(16).padStart(2, "0")).join("");

// hex -> [h(0-360), s(0-100), l(0-100)]
function hexToHsl(hex) {
  const [r0, g0, b0] = hexToRgb(hex).map((v) => v / 255);
  const max = Math.max(r0, g0, b0);
  const min = Math.min(r0, g0, b0);
  const l = ((max + min) / 2) * 100;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = (l > 50 ? d / (2 - max - min) : d / (max + min)) * 100;
    switch (max) {
      case r0: h = ((g0 - b0) / d + (g0 < b0 ? 6 : 0)) * 60; break;
      case g0: h = ((b0 - r0) / d + 2) * 60; break;
      default: h = ((r0 - g0) / d + 4) * 60;
    }
  }
  return [h, s, l];
}

// [h, s, l] (0-360 / 0-100 / 0-100) -> "#rrggbb"
function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return rgbToHex([f(0) * 255, f(8) * 255, f(4) * 255]);
}

// Derives highlight, shadow and text tones from the chosen button color
// (same logic as the copy in content/colors.js; used for the preview).
function deriveButtonTones(hex) {
  const [h, s, l] = hexToHsl(hex);
  const dark = l < 45;
  return {
    hi: hslToHex(h, s, dark ? Math.min(l + 28, 90) : Math.min(l + 20, 96)),
    hi2: hslToHex(h, s, dark ? Math.min(l + 45, 95) : Math.min(l + 40, 98)),
    lo: hslToHex(h, s, dark ? Math.max(l + 10, 8) : Math.max(l - 22, 6)),
    text: l > 72 ? "#2a2c2b" : "#ffffff",
  };
}

// ---------- Color settings ----------

// A default color means "no change" (the site's own color is used)
const DEFAULTS = { bg: "#1e1e1e", light: "#ebecd0", dark: "#739552", button: "#81b64c" };

const isDefault = (key, value) => value.toLowerCase() === DEFAULTS[key];

// When a default color is chosen, "no override" (null) is sent to the page
const effective = (key, value) => (isDefault(key, value) ? null : value);

// Sends instantly to the active tab's content script (does not write to storage)
async function sendLive(key, value) {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab) {
      await chrome.tabs.sendMessage(tab.id, { type: "preview", key, value });
    }
  } catch {
    // If the active tab is not Chess.com there is no content script; that is fine
  }
}

// Persists values. Example: saveColors({ light: "#fff", dark: "#000" })
// If a value equals the default, that key's stored entry is removed.
async function saveColors(values) {
  const toSet = {};
  const toRemove = [];

  for (const [key, value] of Object.entries(values)) {
    const eff = effective(key, value);
    if (eff) toSet[key] = eff;
    else toRemove.push(key);
  }

  try {
    if (Object.keys(toSet).length) await chrome.storage.sync.set(toSet);
    if (toRemove.length) await chrome.storage.sync.remove(toRemove);
  } catch (err) {
    console.warn("Could not save:", err);
  }
}

// ---------- Custom themes ----------

// Custom themes are stored as individual keys "customTheme.<timestamp>" so
// each theme stays small and the sync item quota is never stressed.
const CUSTOM_THEME_PREFIX = "customTheme.";

// Saves a theme object { name, bg, light, dark, button }; returns its id
async function saveCustomTheme(theme) {
  const id = `${CUSTOM_THEME_PREFIX}${Date.now()}`;
  try {
    await chrome.storage.sync.set({ [id]: theme });
    return id;
  } catch (err) {
    console.warn("Could not save theme:", err);
    return null;
  }
}

// Returns all saved custom themes, in creation order
async function getCustomThemes() {
  const all = await chrome.storage.sync.get(null);
  return Object.entries(all)
    .filter(([key]) => key.startsWith(CUSTOM_THEME_PREFIX))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([id, theme]) => ({ id, ...theme }));
}

// Returns the saved custom theme with exactly these four colors, or null
async function findCustomThemeByColors(colors) {
  const themes = await getCustomThemes();
  const keys = ["bg", "light", "dark", "button"];
  return (
    themes.find((theme) =>
      keys.every((k) => (theme[k] || "").toLowerCase() === colors[k].toLowerCase())
    ) || null
  );
}

async function removeCustomTheme(id) {
  try {
    await chrome.storage.sync.remove(id);
  } catch (err) {
    console.warn("Could not delete theme:", err);
  }
}

// ---------- Hide settings ----------

// Stores a toggle/text value; an empty value (false, "") removes the entry
async function saveHide(key, value) {
  try {
    if (value) await chrome.storage.sync.set({ [key]: value });
    else await chrome.storage.sync.remove(key);
  } catch (err) {
    console.warn("Could not save:", err);
  }
}

// Sends an instant hide message to the active tab's content script
async function sendHideLive(key, value) {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab) {
      await chrome.tabs.sendMessage(tab.id, { type: "hide", key, value });
    }
  } catch {
    // If the active tab is not Chess.com there is no content script; that is fine
  }
}