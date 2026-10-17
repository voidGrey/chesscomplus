// ============================================================
// i18n.js — Language support (all popup pages)
//
// HOW TO ADD A NEW LANGUAGE:
//   1. Copy any file in locales/ and rename it with the language code
//      (e.g. zh.js), fill in the translations; keep the keys identical to
//      the other files and set the "flag" field to an ISO country code
//      (e.g. "cn").
//   2. Add <script src="locales/zh.js"></script> to every page's script
//      list, ABOVE the i18n.js line (below en.js, in alphabetical order).
//      Order matters: dictionaries must always load before i18n.js.
//
// That is all — the language picker updates automatically. Flag images are
// fetched from the open-source flagcdn.com.
//
// In HTML, mark translatable text with data-i18n="key"; use
// data-i18n-placeholder for placeholders and data-i18n-aria-label for
// aria-labels. In JS, call t("key").
// ============================================================

// Dictionaries come from the locales/*.js files; those files load BEFORE
// i18n.js and register themselves under globalThis.CPLUS_LOCALES.
// This file contains only the translation engine.
const I18N = globalThis.CPLUS_LOCALES || {};

const SUPPORTED_LANGS = Object.keys(I18N);
const DEFAULT_LANG = "en";

let currentLang = DEFAULT_LANG;

// Looks up a translation: a missing key falls back to English, then to
// the key itself — blank text or errors are never shown. Works safely even
// if dictionaries fail to load entirely (broken locale file, etc.).
function t(key) {
  const dict = I18N[currentLang] || I18N[DEFAULT_LANG] || {};
  return dict[key] ?? I18N[DEFAULT_LANG]?.[key] ?? key;
}

// Applies data-i18n / data-i18n-placeholder / data-i18n-aria-label markers
function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
    el.setAttribute("aria-label", t(el.dataset.i18nAriaLabel));
  });
  document.documentElement.lang = currentLang;
}

// Flag image: open-source flagcdn.com (MIT, Wikipedia flags)
const flagUrl = (code) => `https://flagcdn.com/w40/${code}.png`;

// Falls back to text when the image cannot load (offline, etc.)
function makeFlagImg(code) {
  const img = document.createElement("img");
  img.src = flagUrl(code);
  img.alt = "";
  img.width = 22;
  img.onerror = () => {
    img.replaceWith(document.createTextNode(code.toUpperCase()));
  };
  return img;
}

// Sets up the language picker on the page and persists changes.
// Because images cannot go inside a native <select>, the marked select is
// replaced with a small flag dropdown (if that fails, the select remains).
function setupLangSelect() {
  const select = document.getElementById("langSelect");
  if (!select) return;

  const wrap = document.createElement("div");
  wrap.className = "lang-dropdown";
  const button = document.createElement("button");
  button.type = "button";
  button.className = "lang-dropdown-button";
  button.setAttribute("aria-label", t("common.language"));
  button.setAttribute("aria-haspopup", "listbox");
  button.setAttribute("aria-expanded", "false");
  button.append(makeFlagImg(I18N[currentLang].flag));
  const list = document.createElement("ul");
  list.className = "lang-dropdown-list";
  list.setAttribute("role", "listbox");
  list.hidden = true;

  for (const code of SUPPORTED_LANGS) {
    const item = document.createElement("li");
    item.className = "lang-dropdown-option";
    item.setAttribute("role", "option");
    item.dataset.lang = code;
    const name = document.createElement("span");
    name.textContent = I18N[code].langName;
    item.append(name, makeFlagImg(I18N[code].flag));
    if (code === currentLang) item.classList.add("is-active");
    item.addEventListener("click", async () => {
      if (code === currentLang) {
        close();
        return;
      }
      currentLang = code;
      try {
        await chrome.storage.sync.set({ lang: currentLang });
      } catch (err) {
        console.warn("Could not save language:", err);
      }
      // Reloading the page is the cleanest way since tab labels are JS-generated
      location.reload();
    });
    list.append(item);
  }

  function close() {
    list.hidden = true;
    button.setAttribute("aria-expanded", "false");
  }

  button.addEventListener("click", () => {
    const willOpen = list.hidden;
    list.hidden = !willOpen;
    button.setAttribute("aria-expanded", String(willOpen));
  });

  // Closes on outside click
  document.addEventListener("click", (e) => {
    if (!wrap.contains(e.target)) close();
  });

  wrap.append(button, list);
  select.replaceWith(wrap);
}

// Promise that resolves once the language is ready; other scripts can
// render dynamic text after it (e.g. tabs.js, themes.js).
const i18nReady = (async () => {
  try {
    const saved = await chrome.storage.sync.get("lang");
    if (I18N[saved.lang]) currentLang = saved.lang;
  } catch {
    // stays English if storage cannot be read
  }
  // Each step is guarded independently: a single error cannot kill the popup
  try {
    setupLangSelect();
  } catch (err) {
    console.warn("Language picker could not be set up:", err);
  }
  try {
    applyI18n();
  } catch (err) {
    console.warn("Translations could not be applied:", err);
  }
  document.dispatchEvent(new CustomEvent("cplus:i18n-ready"));
})();