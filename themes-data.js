// Ready-made themes. Add a row to a list to add a theme; it appears on the
// Themes page automatically. Colors must be in #rrggbb format.
//
// Theme names are given as "i18n" keys and resolved from the dictionary in
// i18n.js; without a key, the "name" field is shown as-is.

// Board themes: light = light square color, dark = dark square color
// The first row is the site default (must match DEFAULTS in shared.js).
const BOARD_THEMES = [
  { i18n: "themes.board.default", light: "#ebecd0", dark: "#739552" },
  { i18n: "themes.board.darkBlue", name: "Dark Blue +", light: "#4b525d", dark: "#1e202e" },
  { i18n: "themes.board.wood", light: "#f0d9b5", dark: "#b58863" },
  { i18n: "themes.board.sky", light: "#dee3e6", dark: "#8ca2ad" },
  { i18n: "themes.board.purple", light: "#efefef", dark: "#8475b9" },
  { i18n: "themes.board.slate", light: "#a8b0bc", dark: "#4b5563" },
  { i18n: "themes.board.rose", light: "#f6e3e1", dark: "#c9726f" },
];

// Site arka plan renkleri (tek renk)
// The first row is the site default (must match DEFAULTS in shared.js).
const BACKGROUND_COLORS = [
  { i18n: "themes.bg.default", color: "#1e1e1e" },
  { i18n: "themes.bg.darker", color: "#171717" },
  { i18n: "themes.bg.black", color: "#000000" },
  { i18n: "themes.bg.navy", color: "#111826" },
  { i18n: "themes.bg.forest", color: "#16241b" },
  { i18n: "themes.bg.plum", color: "#241a2c" },
  { i18n: "themes.bg.coffee", color: "#261e19" },
];

// Button color (single color). Hover and shadow tones on the page are
// derived automatically from this color by deriveButtonTones in
// content/colors.js.
// The first row is the site default (must match DEFAULTS in shared.js).
const BUTTON_THEMES = [
  { i18n: "themes.button.default", color: "#81b64c" },
  { i18n: "themes.button.orange", color: "#e8912c" },
  { i18n: "themes.button.sea", color: "#3d8fd1" },
];