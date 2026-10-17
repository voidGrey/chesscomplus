// Extra Settings page: opponent hide toggles, streamer mode and masking
// lists (fake names, avatar URLs).

// --- Sub-tabs ---
document.querySelectorAll(".subtab").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".subtab").forEach((b) => {
      b.classList.toggle("is-active", b === btn);
    });
    document.querySelectorAll(".panel").forEach((p) => {
      p.hidden = p.id !== btn.dataset.panel;
    });
  });
});

// --- Boolean toggles ---
const HIDE_TOGGLES = [
  { input: "hideOppName",   key: "hideOppName" },
  { input: "hideOppRating", key: "hideOppRating" },
  { input: "hideOppFlag",   key: "hideOppFlag" },
  { input: "hideOppAvatar", key: "hideOppAvatar" },
  { input: "streamer",      key: "streamer" },
  { input: "hideSelfRating", key: "hideSelfRating" },
];

// --- Masking data (text) ---
const MASK_INPUTS = ["pseudoNames", "avatarUrls", "selfName", "selfAvatarUrl"];

const SAVE_DELAY = 400; // ms

async function init() {
  const saved = await chrome.storage.sync.get(
    HIDE_TOGGLES.map((t) => t.key).concat(MASK_INPUTS)
  );

  for (const { input, key } of HIDE_TOGGLES) {
    const toggle = document.getElementById(input);
    toggle.checked = Boolean(saved[key]);
    toggle.addEventListener("change", async () => {
      await saveHide(key, toggle.checked);
      sendHideLive(key, toggle.checked);
    });
  }

  for (const key of MASK_INPUTS) {
    const el = document.getElementById(key);
    el.value = saved[key] || "";
    let saveTimer;
    el.addEventListener("input", () => {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(async () => {
        await saveHide(key, el.value); // an empty value removes the stored entry
        sendHideLive(key, el.value);
      }, SAVE_DELAY);
    });
  }
}

init();