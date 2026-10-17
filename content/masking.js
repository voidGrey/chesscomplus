// ============================================================
// content/masking.js — Hiding and masking engine
// Hides or masks opponent/self elements according to the Extra Settings
// toggles. The "hideSettings" state lives in main.js; the functions in this
// file read that state at runtime.
// ============================================================

// Classifies a player element as self/opponent. On the game screen each
// player sits inside a .player-component container: player-top = opponent,
// player-bottom = self. The .rating-score-rating check is a fallback for
// older layouts.
function classifySide(el) {
  const comp = el.closest(".player-component");
  if (comp) {
    if (comp.classList.contains("player-bottom")) return "self";
    if (comp.classList.contains("player-top")) return "opponent";
  }
  let node = el.parentElement;
  for (let i = 0; node && i < 6; i++, node = node.parentElement) {
    if (node.querySelector(".rating-score-rating")) return "self";
  }
  return "opponent"; // assumed opponent when it cannot be determined
}

// Hides/shows elements that must be removed entirely, such as flags and
// league badges. (.cplus-hidden is defined in content.css.)
function setHidden(el, hide) {
  el.classList.toggle("cplus-hidden", Boolean(hide));
}

// ---------- Text masking ----------

// Stores the original text in the dataset and shows the masked version.
// If the site refreshes the text (e.g. an end-of-game rating change) the
// stored original is updated as well, so the latest value is restored when
// the toggle is turned off. Skips writing when the value already matches
// the mask -> prevents observer loops.
function maskText(el, maskFn) {
  const current = el.textContent;
  if (el.dataset.cplusOrig === undefined) {
    el.dataset.cplusOrig = current;
  } else {
    const knownMasked = maskFn(el.dataset.cplusOrig);
    if (current !== el.dataset.cplusOrig && current !== knownMasked) {
      el.dataset.cplusOrig = current;
    }
  }
  const masked = maskFn(el.dataset.cplusOrig);
  if (current !== masked) el.textContent = masked;
}

function unmaskText(el) {
  if (el.dataset.cplusOrig !== undefined) {
    el.textContent = el.dataset.cplusOrig;
    delete el.dataset.cplusOrig;
  }
}

// Replaces digits with ?: "(593)" -> "(???)"
const ratingMask = (text) => text.replace(/\d/g, "?");

// ---------- Fake names ----------

// Real name -> fake name mapping; the same opponent keeps the same name for the session
const pseudoMap = new Map();

function parseList(value, separator) {
  return (value || "").split(separator).map((s) => s.trim()).filter(Boolean);
}

function pseudoFor(original) {
  if (!pseudoMap.has(original)) {
    const list = parseList(hideSettings.pseudoNames, ",");
    pseudoMap.set(
      original,
      list.length ? list[Math.floor(Math.random() * list.length)] : "###SecretUser###"
    );
  }
  return pseudoMap.get(original);
}

// ---------- Avatar masking ----------

// Real avatar src -> mask src mapping
const avatarMap = new Map();

function avatarFor(original) {
  if (!avatarMap.has(original)) {
    const list = parseList(hideSettings.avatarUrls, "\n");
    avatarMap.set(
      original,
      list.length ? list[Math.floor(Math.random() * list.length)]
                  : chrome.runtime.getURL("HiddenAvatar.png")
    );
  }
  return avatarMap.get(original);
}

// The user's own name/avatar in streamer mode: comes from the settings;
// when left empty, falls back to the same defaults as for opponents.
function selfNameFor(original) {
  const custom = (hideSettings.selfName || "").trim();
  return custom || pseudoFor(original);
}

function selfAvatarFor(original) {
  const custom = (hideSettings.selfAvatarUrl || "").trim();
  return custom || avatarFor(original);
}

function maskAvatar(img, resolveMask) {
  const currentSrc = img.getAttribute("src") || "";
  if (img.dataset.cplusOrigSrc === undefined) {
    img.dataset.cplusOrigSrc = currentSrc;
    img.dataset.cplusOrigSrcset = img.getAttribute("srcset") || "";
    img.dataset.cplusOrigAlt = img.getAttribute("alt") || "";
  } else {
    const knownMasked = resolveMask(img.dataset.cplusOrigSrc);
    if (currentSrc !== img.dataset.cplusOrigSrc && currentSrc !== knownMasked) {
      // If the site refreshed the avatar, store the new real value
      img.dataset.cplusOrigSrc = currentSrc;
      img.dataset.cplusOrigSrcset = img.getAttribute("srcset") || "";
    }
  }
  const target = resolveMask(img.dataset.cplusOrigSrc);
  if (currentSrc !== target) img.src = target;
  img.removeAttribute("srcset");
  img.alt = "";
}

function unmaskAvatar(img) {
  if (img.dataset.cplusOrigSrc === undefined) return;
  img.src = img.dataset.cplusOrigSrc;
  if (img.dataset.cplusOrigSrcset) img.setAttribute("srcset", img.dataset.cplusOrigSrcset);
  if (img.dataset.cplusOrigAlt) img.alt = img.dataset.cplusOrigAlt;
  delete img.dataset.cplusOrigSrc;
  delete img.dataset.cplusOrigSrcset;
  delete img.dataset.cplusOrigAlt;
}

// ---------- Application ----------

// Applies the current settings to all target elements
function applyHiding() {
  const s = hideSettings;

  // Usernames: self is masked in streamer mode, opponent via its own toggle
  document
    .querySelectorAll('[data-test-element="user-tagline-username"]')
    .forEach((el) => {
      const isSelf = classifySide(el) === "self";
      const mask = isSelf ? s.streamer : s.hideOppName;
      if (mask) maskText(el, isSelf ? selfNameFor : pseudoFor);
      else unmaskText(el);
    });

  // Tagline ratings: "(593)" -> "(???)"
  // Self: "Hide my rating" works independently of streamer mode
  document.querySelectorAll(".cc-user-rating-white").forEach((el) => {
    const isSelf = classifySide(el) === "self";
    const mask = isSelf ? s.hideSelfRating : s.hideOppRating;
    if (mask) maskText(el, ratingMask);
    else unmaskText(el);
  });

  // Flags: hidden entirely
  document.querySelectorAll(".cc-country-flag-component").forEach((el) => {
    const isSelf = classifySide(el) === "self";
    setHidden(el, isSelf ? s.streamer : s.hideOppFlag);
  });

  // Avatars: masked with HiddenAvatar.png or the URLs the user entered
  document.querySelectorAll(".player-avatar img.cc-avatar-img").forEach((img) => {
    const isSelf = classifySide(img) === "self";
    const mask = isSelf ? s.streamer : s.hideOppAvatar;
    if (mask) maskAvatar(img, isSelf ? selfAvatarFor : avatarFor);
    else unmaskAvatar(img);
  });

  // End-of-game score blocks: the real rating (.rating-score-rating) and
  // the change indicator (.rating-score-change) inside the newly appearing
  // .player-game-over-component. The change indicator (+8/-8) is hidden
  // entirely because it leaks information.
  document.querySelectorAll(".player-game-over-component").forEach((block) => {
    const isSelf = classifySide(block) === "self";
    const mask = isSelf ? s.hideSelfRating : s.hideOppRating;

    const ratingEl = block.querySelector(".rating-score-rating");
    if (ratingEl) {
      if (mask) maskText(ratingEl, ratingMask);
      else unmaskText(ratingEl);
    }
    const changeEl = block.querySelector(".rating-score-change");
    if (changeEl) setHidden(changeEl, mask);
  });

  // The rating card in the game-over modal: the modal always shows the
  // user's own rating. Frame-by-frame changes during the count-up animation
  // are also caught by the text observer.
  const hideSelfRating = s.hideSelfRating;
  document
    .querySelectorAll(".game-over-stat-card-component.game-over-stat-card-rating")
    .forEach((card) => {
      const valueEl = card.querySelector(".game-over-stat-card-value");
      if (valueEl) {
        if (hideSelfRating) maskText(valueEl, ratingMask);
        else unmaskText(valueEl);
      }
      const deltaEl = card.querySelector(".game-over-stat-card-delta");
      if (deltaEl) setHidden(deltaEl, hideSelfRating);
    });

  // League badge (legacy layout)
  document.querySelectorAll(".league-score-component").forEach((el) => {
    setHidden(el, s.streamer);
  });
}

// ---------- DOM observer ----------

// Chess.com is a single-page app: masking is kept across DOM changes such
// as moves, new opponents, live updates and end-of-game rating changes.
// Text (characterData) changes are also observed; the no-op guard inside
// maskText/maskAvatar keeps these triggers from looping.
let hideObserverStarted = false;
let hideRaf = null;

function scheduleHiding() {
  if (hideRaf !== null) return;
  hideRaf = requestAnimationFrame(() => {
    hideRaf = null;
    applyHiding();
  });
}

function startHideObserver() {
  if (hideObserverStarted || !document.body) return;
  hideObserverStarted = true;
  new MutationObserver(scheduleHiding).observe(document.body, {
    childList: true,
    characterData: true,
    subtree: true,
  });
}