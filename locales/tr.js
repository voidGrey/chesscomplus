// ============================================================
// locales/tr.js — Türkçe sözlüğü
//
// Bu dosya kendini global CPLUS_LOCALES koleksiyonuna kaydeder; i18n.js'den
// ÖNCE yüklenmelidir. Yeni çeviri için bu dosyayı kopyalayıp dil koduyla
// adlandırın (örn. zh.js), içeriği çevirin ve her sayfadaki script
// listesine i18n.js SATIRININ ÜSTÜNE ekleyin.
// ============================================================

(globalThis.CPLUS_LOCALES = globalThis.CPLUS_LOCALES || {})["tr"] = {
    langName: "Türkçe",
    flag: "tr",

    // Alt sekme çubuğu
    "tabs.settings": "Settings+",
    "tabs.themes": "Temalar",
    "tabs.extra": "Ek Ayarlar",
    "tabs.aria": "Sayfalar",
    "common.language": "Dil",

    // Settings+ (popup.html)
    "popup.subtitle": "Satranç tahtanı kendine göre düzenle",
    "popup.siteBackground": "Site arka planı",
    "popup.lightSquares": "Açık kareler",
    "popup.darkSquares": "Koyu kareler",
    "popup.buttonColor": "Buton rengi",
    "popup.resetSiteBackground": "Site arka planını sıfırla",
    "popup.resetLightSquares": "Açık kare rengini sıfırla",
    "popup.resetDarkSquares": "Koyu kare rengini sıfırla",
    "popup.resetButtonColor": "Buton rengini sıfırla",
    "popup.saveTheme": "Temayı Kaydet",
    "popup.themeNamePlaceholder": "Tema adı...",
    "popup.themeExists": 'Bu renkleri kullanan bir tema zaten var: "{name}"',

    // Themes
    "themes.subtitle": "Hazır tahta ve arka plan renkleri",
    "themes.boardTheme": "Tahta teması",
    "themes.siteBackground": "Site arka planı",
    "themes.buttonColor": "Buton rengi",
    "themes.custom": "Özel",
    "themes.customThemes": "Özel Temalar",
    "themes.board.default": "Varsayılan",
    "themes.board.darkBlue": "Koyu Mavi +",
    "themes.board.wood": "Ahşap",
    "themes.board.sky": "Gökyüzü",
    "themes.board.purple": "Mor",
    "themes.board.slate": "Arduvaz",
    "themes.board.rose": "Gül",
    "themes.bg.default": "Varsayılan",
    "themes.bg.darker": "Ekstra Koyu",
    "themes.bg.black": "Siyah",
    "themes.bg.navy": "Gece mavisi",
    "themes.bg.forest": "Orman",
    "themes.bg.plum": "Erik",
    "themes.bg.coffee": "Kahve",
    "themes.button.default": "Varsayılan",
    "themes.button.orange": "Turuncu",
    "themes.button.sea": "Deniz",

    // Extra Settings
    "extra.subtitle": "Gizlilik ve yayın ayarları",
    "extra.tabHiding": "Gizleme",
    "extra.tabMasking": "Maskeleme",
    "extra.subtabsAria": "Ek ayarlar",
    "extra.opponent": "Rakip",
    "extra.maskOppName": "Kullanıcı adını maskele",
    "extra.hideOppRating": "Ratingi gizle",
    "extra.hideOppFlag": "Ülke bayrağını gizle",
    "extra.maskOppAvatar": "Avatarı maskele",
    "extra.streamerMode": "Streamer Mod",
    "extra.streamerDesc": "Kendi adınızı, bayrağınızı ve avatarınızı tek seferde maskeler.",
    "extra.hideSelfRating": "Ratingimi gizle",
    "extra.fakeNamesLabel": "Rakip için sahte adlar",
    "extra.fakeNamesHint": "Virgülle ayırarak yazın. Boş bırakılırsa ###SecretUser### kullanılır. Aynı rakip oturum boyunca aynı sahte adı alır.",
    "extra.fakeNamesPlaceholder": "Örn: GizliRakip, AnonimSatranc, ???",
    "extra.avatarUrlsLabel": "Rakip için avatar URL'leri",
    "extra.avatarUrlsHint": "Her satıra bir adres yazın. Boş bırakılırsa eklentideki HiddenAvatar.png kullanılır (dosyayı kendi resminizle değiştirebilirsiniz).",
    "extra.selfNameLabel": "Yayın adınız",
    "extra.selfNameHint": "Streamer Mod açıkken sizin adınızın yerine gösterilir. Boş bırakılırsa rakip için geçerli liste kullanılır.",
    "extra.selfNamePlaceholder": "Örn: GizemliOyuncu",
    "extra.selfAvatarLabel": "Yayın avatarınız",
    "extra.selfAvatarHint": "Streamer Mod açıkken sizin avatarınızın yerine gösterilir. Boş bırakılırsa rakip için geçerli avatar ayarı kullanılır.",
    "extra.selfAvatarPlaceholder": "https://ornek.com/avatarim.png",
};