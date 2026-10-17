// ============================================================
// tabs.js — Bottom tab bar: identical on all pages, managed in one place.
// Tab labels come from the "tabs.*" keys in i18n.js; add a row to the TABS
// list to add a new tab.
// ============================================================

const TABS = [
  { i18n: "tabs.settings", href: "popup.html" },
  { i18n: "tabs.themes",   href: "themes.html" },
  { i18n: "tabs.extra",    href: "extra.html" },
];

const currentPage = location.pathname.split("/").pop() || "popup.html";

function renderTabs() {
  const tabsNav = document.getElementById("tabs");
  tabsNav.replaceChildren();

  for (const tab of TABS) {
    const link = document.createElement("a");
    link.href = tab.href;
    link.textContent = t(tab.i18n);
    if (tab.href === currentPage) link.setAttribute("aria-current", "page");

    // Handle link clicks as in-popup navigation;
    // the default behavior (new tab) is prevented.
    link.addEventListener("click", (e) => {
      e.preventDefault();
      location.href = tab.href;
    });

    tabsNav.append(link);
  }
}

// If i18n.js is loaded, render once the language is ready; otherwise render in English
if (typeof i18nReady !== "undefined") {
  // Keep rendering tabs even if the language engine rejects for any reason
  i18nReady.then(renderTabs).catch(() => renderTabs());
} else {
  renderTabs();
}