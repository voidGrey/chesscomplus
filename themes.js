// Themes page: dropdowns for ready-made board themes, site background and
// button color. Data lives in themes-data.js, shared helpers in shared.js,
// and translations are resolved through i18n.js.

const dropdowns = [];

const sameColor = (a, b) => a.toLowerCase() === b.toLowerCase();

// Theme name: resolved from the dictionary when an i18n key exists; for
// entries without a key (your own themes, the "Custom" fallback) the raw
// data name is shown as-is.
function itemName(item) {
  return item.i18n ? t(item.i18n) : item.name;
}

// Board preview (4x2 squares)
function boardSwatch({ light, dark }) {
  const el = document.createElement("span");
  el.className = "board-swatch";
  el.style.setProperty("--sw-light", light);
  el.style.setProperty("--sw-dark", dark);
  return el;
}

// Single-color preview
function colorSwatch({ color }) {
  const el = document.createElement("span");
  el.className = "color-swatch";
  el.style.setProperty("--sw-color", color);
  return el;
}

function createDropdown({ root, items, renderPreview, onSelect }) {
  const button = root.querySelector(".dropdown-button");
  const previewSlot = root.querySelector(".dropdown-preview");
  const nameSlot = root.querySelector(".dropdown-name");
  const list = root.querySelector(".dropdown-list");
  const options = [];
  let selectedIndex = -1;

  // Updates the selection shown on the button
  function show(item) {
    previewSlot.replaceChildren(renderPreview(item));
    nameSlot.textContent = itemName(item);
  }

  function markSelected(index) {
    selectedIndex = index;
    options.forEach((option, i) => {
      option.setAttribute("aria-selected", String(i === index));
    });
  }

  function open() {
    dropdowns.forEach((d) => d.close());
    list.hidden = false;
    root.classList.add("is-open");
    button.setAttribute("aria-expanded", "true");
    (options[selectedIndex] || options[0])?.focus();
  }

  function close() {
    list.hidden = true;
    root.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");
  }

  function choose(index) {
    markSelected(index);
    show(items[index]);
    close();
    button.focus();
    onSelect(items[index]);
  }

  // Builds the options from the array
  items.forEach((item, i) => {
    const li = document.createElement("li");
    li.className = "dropdown-option";
    li.setAttribute("role", "option");
    li.setAttribute("aria-selected", "false");
    li.tabIndex = -1;

    const name = document.createElement("span");
    name.textContent = itemName(item);

    li.append(renderPreview(item), name);
    li.addEventListener("click", () => choose(i));
    list.append(li);
    options.push(li);
  });

  button.addEventListener("click", () => (list.hidden ? open() : close()));

  button.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      open();
    }
  });

  list.addEventListener("keydown", (e) => {
    const current = options.indexOf(document.activeElement);
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        options[Math.min(current + 1, options.length - 1)].focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        options[Math.max(current - 1, 0)].focus();
        break;
      case "Home":
        e.preventDefault();
        options[0].focus();
        break;
      case "End":
        e.preventDefault();
        options[options.length - 1].focus();
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (current >= 0) choose(current);
        break;
      case "Escape":
        e.preventDefault();
        close();
        button.focus();
        break;
      case "Tab":
        close();
        break;
    }
  });

  // Closes on outside click
  document.addEventListener("click", (e) => {
    if (!root.contains(e.target)) close();
  });

  const api = {
    close,
    // index -1 shows a "custom" color that is not in the list
    select(index, customItem) {
      markSelected(index);
      show(index >= 0 ? items[index] : customItem);
    },
  };
  dropdowns.push(api);
  return api;
}

// Sets up a single-color dropdown (background, button) and matches the saved value
function setupColorDropdown({ rootId, items, savedKey, saved }) {
  const dropdown = createDropdown({
    root: document.getElementById(rootId),
    items,
    renderPreview: colorSwatch,
    onSelect: ({ color }) => {
      sendLive(savedKey, effective(savedKey, color));
      saveColors({ [savedKey]: color });
    },
  });

  const index = items.findIndex((item) => sameColor(item.color, saved[savedKey]));
  dropdown.select(index, { name: t("themes.custom"), color: saved[savedKey] });
  return dropdown;
}

async function init() {
  // Do not render strings like "Custom" before the language is ready;
  // if the engine fails, continue in English
  if (typeof i18nReady !== "undefined") {
    await i18nReady.catch(() => {});
  }
  const saved = await chrome.storage.sync.get(DEFAULTS);

  // Board theme
  const themeDropdown = createDropdown({
    root: document.getElementById("themeDropdown"),
    items: BOARD_THEMES,
    renderPreview: boardSwatch,
    onSelect: ({ light, dark }) => {
      sendLive("light", effective("light", light));
      sendLive("dark", effective("dark", dark));
      saveColors({ light, dark });
    },
  });

  const themeIndex = BOARD_THEMES.findIndex(
    (theme) => sameColor(theme.light, saved.light) && sameColor(theme.dark, saved.dark)
  );
  themeDropdown.select(themeIndex, { name: t("themes.custom"), light: saved.light, dark: saved.dark });

  // Site background
  setupColorDropdown({
    rootId: "backgroundDropdown",
    items: BACKGROUND_COLORS,
    savedKey: "bg",
    saved,
  });

  // Button color
  setupColorDropdown({
    rootId: "buttonDropdown",
    items: BUTTON_THEMES,
    savedKey: "button",
    saved,
  });
}

init();