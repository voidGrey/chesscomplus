// ============================================================
// popup.js — Settings+ page
// Wires the color pickers, updates the preview, sends changes to the page
// instantly and persists them. Color tools and send helpers live in
// shared.js.
// ============================================================

const FIELDS = [
  { key: "bg",     input: "bgColor",     hex: "bgHex",     reset: "bgReset",     previewVar: "--pv-bg" },
  { key: "light",  input: "lightColor",  hex: "lightHex",  reset: "lightReset",  previewVar: "--pv-light" },
  { key: "dark",   input: "darkColor",   hex: "darkHex",   reset: "darkReset",   previewVar: "--pv-dark" },
  { key: "button", input: "buttonColor", hex: "buttonHex", reset: "buttonReset", previewVar: "--pv-button" },
];

const SAVE_DELAY = 400; // ms

const preview = document.getElementById("preview");

// For the button field, also writes the derived tones to the preview
function showButtonTones(value) {
  const { hi, hi2, lo, text } = deriveButtonTones(value);
  preview.style.setProperty("--pv-button-hi", hi);
  preview.style.setProperty("--pv-button-hi2", hi2);
  preview.style.setProperty("--pv-button-lo", lo);
  preview.style.setProperty("--pv-button-text", text);
}

// Updates the picker, hex label, reset button and preview
function show(field, value) {
  document.getElementById(field.input).value = value;
  document.getElementById(field.hex).textContent = value;
  document.getElementById(field.reset).classList.toggle("is-visible", !isDefault(field.key, value));
  preview.style.setProperty(field.previewVar, value);
  if (field.key === "button") showButtonTones(value);
}

async function init() {
  // Falls back to DEFAULTS when nothing is stored
  const saved = await chrome.storage.sync.get(DEFAULTS);

  for (const field of FIELDS) {
    const input = document.getElementById(field.input);
    const resetBtn = document.getElementById(field.reset);
    let saveTimer;

    show(field, saved[field.key]);

    // While moving in the color picker: preview + page update instantly.
    // Because of storage write limits, saving happens once movement stops.
    input.addEventListener("input", () => {
      show(field, input.value);
      sendLive(field.key, effective(field.key, input.value));
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => saveColors({ [field.key]: input.value }), SAVE_DELAY);
    });

    // Save immediately when the picker closes
    input.addEventListener("change", () => {
      clearTimeout(saveTimer);
      saveColors({ [field.key]: input.value });
    });

    // Reset: back to the default
    resetBtn.addEventListener("click", () => {
      clearTimeout(saveTimer);
      show(field, DEFAULTS[field.key]);
      sendLive(field.key, null);
      saveColors({ [field.key]: DEFAULTS[field.key] });
    });
  }
}

init();