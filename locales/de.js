// ============================================================
// locales/de.js — Deutsch (Almanca) sözlüğü
//
// Bu dosya kendini global CPLUS_LOCALES koleksiyonuna kaydeder; i18n.js'den
// ÖNCE yüklenmelidir. Yeni çeviri için bu dosyayı kopyalayıp dil koduyla
// adlandırın (örn. ko.js), içeriği çevirin ve her sayfadaki script
// listesine i18n.js SATIRININ ÜSTÜNE ekleyin.
// ============================================================

(globalThis.CPLUS_LOCALES = globalThis.CPLUS_LOCALES || {})["de"] = {
    langName: "Deutsch",
    flag: "de",

    // Alt sekme çubuğu
    "tabs.settings": "Settings+",
    "tabs.themes": "Themes",
    "tabs.extra": "Extra-Einstellungen",
    "tabs.aria": "Seiten",
    "common.language": "Sprache",

    // Settings+ (popup.html)
    "popup.subtitle": "Passe dein Schachbrett an",
    "popup.siteBackground": "Seitenhintergrund",
    "popup.lightSquares": "Helle Felder",
    "popup.darkSquares": "Dunkle Felder",
    "popup.buttonColor": "Button-Farbe",
    "popup.resetSiteBackground": "Seitenhintergrund zurücksetzen",
    "popup.resetLightSquares": "Farbe der hellen Felder zurücksetzen",
    "popup.resetDarkSquares": "Farbe der dunklen Felder zurücksetzen",
    "popup.resetButtonColor": "Button-Farbe zurücksetzen",

    // Themes
    "themes.subtitle": "Fertige Brett- und Hintergrundfarben",
    "themes.boardTheme": "Brett-Theme",
    "themes.siteBackground": "Site background",
    "themes.buttonColor": "Button color",
    "themes.custom": "Benutzerdefiniert",
    "themes.board.default": "Standard",
    "themes.board.darkBlue": "Dunkelblau +",
    "themes.board.wood": "Holz",
    "themes.board.sky": "Himmel",
    "themes.board.purple": "Violett",
    "themes.board.slate": "Schiefer",
    "themes.board.rose": "Rose",
    "themes.bg.default": "Standard",
    "themes.bg.darker": "Extra dunkel",
    "themes.bg.black": "Schwarz",
    "themes.bg.navy": "Marineblau",
    "themes.bg.forest": "Wald",
    "themes.bg.plum": "Pflaume",
    "themes.bg.coffee": "Kaffee",
    "themes.button.default": "Standard",
    "themes.button.orange": "Orange",
    "themes.button.sea": "Meer",

    // Extra Settings
    "extra.subtitle": "Datenschutz- und Streaming-Einstellungen",
    "extra.tabHiding": "Privatsphäre",
    "extra.tabMasking": "Maskierung",
    "extra.subtabsAria": "Zusätzliche Einstellungen",
    "extra.opponent": "Gegner",
    "extra.maskOppName": "Benutzernamen maskieren",
    "extra.hideOppRating": "Wertung verbergen",
    "extra.hideOppFlag": "Landesflagge verbergen",
    "extra.maskOppAvatar": "Avatar maskieren",
    "extra.streamerMode": "Streamer-Modus",
    "extra.streamerDesc": "Maskiert deinen Benutzernamen, deine Flagge und deinen Avatar auf einmal.",
    "extra.hideSelfRating": "Meine Wertung verbergen",
    "extra.fakeNamesLabel": "Fake-Namen für den Gegner",
    "extra.fakeNamesHint": "Mit Kommas trennen. Wenn leer, wird ###SecretUser### verwendet. Derselbe Gegner behält für die Sitzung denselben Namen.",
    "extra.fakeNamesPlaceholder": "Z. B. HiddenFoe, AnonPlayer, ???",
    "extra.avatarUrlsLabel": "Avatar-URLs für den Gegner",
    "extra.avatarUrlsHint": "Eine URL pro Zeile. Wenn leer, wird die mitgelieferte HiddenAvatar.png verwendet (die Datei kann durch ein eigenes Bild ersetzt werden).",
    "extra.selfNameLabel": "Dein Stream-Name",
    "extra.selfNameHint": "Wird im Streamer-Modus statt deines Benutzernamens angezeigt. Wenn leer, wird die Gegnerliste verwendet.",
    "extra.selfNamePlaceholder": "Z. B. MysticPlayer",
    "extra.selfAvatarLabel": "Dein Stream-Avatar",
    "extra.selfAvatarHint": "Wird im Streamer-Modus statt deines Avatars angezeigt. Wenn leer, wird die Avatar-Einstellung des Gegners verwendet.",
    "extra.selfAvatarPlaceholder": "https://example.com/my-avatar.png",
    "extra.self": "Ich"
};