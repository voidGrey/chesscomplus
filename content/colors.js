// ============================================================
// content/colors.js — Color conversion tools
// Used by the content-script files running in the Chess.com page context.
// The popup pages live in a separate context, so a copy of these helpers is
// kept under "Color tools" in shared.js.
// ============================================================

// "#rrggbb" / "#rgb" -> [r, g, b] (0-255)
function hexToRgb(hex) {
  let h = hex.trim().replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

// [r, g, b] -> "#rrggbb"
function rgbToHex([r, g, b]) {
  const p = (x) => Math.round(x).toString(16).padStart(2, "0");
  return "#" + p(r) + p(g) + p(b);
}

// Converts an "rgb(12, 34, 56)" / "rgba(...)" string to hex; null on failure
function cssColorToHex(value) {
  const m = value && value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  return m ? rgbToHex([+m[1], +m[2], +m[3]]) : null;
}

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

// Derives highlight, shadow and text tones from the chosen button color.
// For dark colors the shadow is lightened (a black shadow would disappear);
// for very light colors the text is darkened (white text would be unreadable).
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

// Smooth ease-out: t=0 -> 0, t=1 -> 1
const easeOut = (t) => 1 - Math.cos((t * Math.PI) / 2);