// ============================================================
// locales/en.js — English sözlüğü
//
// Bu dosya kendini global CPLUS_LOCALES koleksiyonuna kaydeder; i18n.js'den
// ÖNCE yüklenmelidir. Yeni çeviri için bu dosyayı kopyalayıp dil koduyla
// adlandırın (örn. zh.js), içeriği çevirin ve her sayfadaki script
// listesine i18n.js SATIRININ ÜSTÜNE ekleyin.
// ============================================================

(globalThis.CPLUS_LOCALES = globalThis.CPLUS_LOCALES || {})["en"] = {
    langName: "English",
    flag: "gb",

    // Alt sekme çubuğu
    "tabs.settings": "Settings+",
    "tabs.themes": "Themes",
    "tabs.extra": "Extra Settings",
    "tabs.aria": "Pages",
    "common.language": "Language",

    // Settings+ (popup.html)
    "popup.subtitle": "Customize your chess board",
    "popup.siteBackground": "Site background",
    "popup.lightSquares": "Light squares",
    "popup.darkSquares": "Dark squares",
    "popup.buttonColor": "Button color",
    "popup.resetSiteBackground": "Reset site background",
    "popup.resetLightSquares": "Reset light square color",
    "popup.resetDarkSquares": "Reset dark square color",
    "popup.resetButtonColor": "Reset button color",
    "popup.saveTheme": "Save Theme",
    "popup.themeNamePlaceholder": "Theme name...",
    "popup.themeExists": 'A theme with these colors already exists: "{name}"',

    // Themes
    "themes.subtitle": "Ready-made board and background colors",
    "themes.boardTheme": "Board theme",
    "themes.siteBackground": "Site background",
    "themes.buttonColor": "Button color",
    "themes.custom": "Custom",
    "themes.customThemes": "Custom Themes",
    "themes.board.default": "Default",
    "themes.board.darkBlue": "Dark Blue +",
    "themes.board.wood": "Wood",
    "themes.board.sky": "Sky",
    "themes.board.purple": "Purple",
    "themes.board.slate": "Slate",
    "themes.board.rose": "Rose",
    "themes.bg.default": "Default",
    "themes.bg.darker": "Extra Dark",
    "themes.bg.black": "Black",
    "themes.bg.navy": "Navy",
    "themes.bg.forest": "Forest",
    "themes.bg.plum": "Plum",
    "themes.bg.coffee": "Coffee",
    "themes.button.default": "Default",
    "themes.button.orange": "Orange",
    "themes.button.sea": "Sea",

    // Extra Settings
    "extra.subtitle": "Privacy and streaming settings",
    "extra.tabHiding": "Hiding",
    "extra.tabMasking": "Masking",
    "extra.subtabsAria": "Extra settings",
    "extra.opponent": "Opponent",
    "extra.maskOppName": "Mask username",
    "extra.hideOppRating": "Hide rating",
    "extra.hideOppFlag": "Hide country flag",
    "extra.maskOppAvatar": "Mask avatar",
    "extra.streamerMode": "Streamer Mode",
    "extra.streamerDesc": "Masks your username, flag and avatar all at once.",
    "extra.hideSelfRating": "Hide my rating",
    "extra.fakeNamesLabel": "Fake names for opponent",
    "extra.fakeNamesHint": "Separate with commas. If left empty, ###SecretUser### is used. The same opponent keeps the same fake name for the session.",
    "extra.fakeNamesPlaceholder": "E.g. HiddenFoe, AnonPlayer, ???",
    "extra.avatarUrlsLabel": "Avatar URLs for opponent",
    "extra.avatarUrlsHint": "One URL per line. If left empty, the bundled HiddenAvatar.png is used (you can replace the file with your own image).",
    "extra.selfNameLabel": "Your stream name",
    "extra.selfNameHint": "Shown instead of your username while Streamer Mode is on. If left empty, the opponent list is used.",
    "extra.selfNamePlaceholder": "E.g. MysticPlayer",
    "extra.selfAvatarLabel": "Your stream avatar",
    "extra.selfAvatarHint": "Shown instead of your avatar while Streamer Mode is on. If left empty, the opponent avatar setting is used.",
    "extra.selfAvatarPlaceholder": "https://example.com/my-avatar.png",
};