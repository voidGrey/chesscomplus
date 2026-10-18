// ============================================================
// locales/ru.js — Русский (Rusça) sözlüğü
//
// Bu dosya kendini global CPLUS_LOCALES koleksiyonuna kaydeder; i18n.js'den
// ÖNCE yüklenmelidir. Yeni çeviri için bu dosyayı kopyalayıp dil koduyla
// adlandırın (örn. de.js), içeriği çevirin ve her sayfadaki script
// listesine i18n.js SATIRININ ÜSTÜNE ekleyin.
// ============================================================

(globalThis.CPLUS_LOCALES = globalThis.CPLUS_LOCALES || {})["ru"] = {
    langName: "Русский",
    flag: "ru",

    // Alt sekme çubuğu
    "tabs.settings": "Settings+",
    "tabs.themes": "Темы",
    "tabs.extra": "Доп. настройки",
    "tabs.aria": "Страницы",
    "common.language": "Язык",

    // Settings+ (popup.html)
    "popup.subtitle": "Настройте шахматную доску под себя",
    "popup.siteBackground": "Фон сайта",
    "popup.lightSquares": "Светлые клетки",
    "popup.darkSquares": "Тёмные клетки",
    "popup.buttonColor": "Цвет кнопок",
    "popup.resetSiteBackground": "Сбросить фон сайта",
    "popup.resetLightSquares": "Сбросить цвет светлых клеток",
    "popup.resetDarkSquares": "Сбросить цвет тёмных клеток",
    "popup.resetButtonColor": "Сбросить цвет кнопок",
    "popup.saveTheme": "Сохранить тему",
    "popup.themeNamePlaceholder": "Название темы...",
    "popup.themeExists": 'Тема с такими же цветами уже существует: "{name}"',

    // Themes
    "themes.subtitle": "Готовые темы доски и фона",
    "themes.boardTheme": "Тема доски",
    "themes.siteBackground": "Site background",
    "themes.buttonColor": "Button color",
    "themes.custom": "Своя",
    "themes.customThemes": "Пользовательские темы",
    "themes.board.default": "По умолчанию",
    "themes.board.darkBlue": "Тёмно-синяя +",
    "themes.board.wood": "Дерево",
    "themes.board.sky": "Небо",
    "themes.board.purple": "Фиолетовая",
    "themes.board.slate": "Сланец",
    "themes.board.rose": "Роза",
    "themes.bg.default": "По умолчанию",
    "themes.bg.darker": "Темнее",
    "themes.bg.black": "Чёрный",
    "themes.bg.navy": "Тёмно-синий",
    "themes.bg.forest": "Лес",
    "themes.bg.plum": "Слива",
    "themes.bg.coffee": "Кофе",
    "themes.button.default": "По умолчанию",
    "themes.button.orange": "Оранжевый",
    "themes.button.sea": "Море",

    // Extra Settings
    "extra.subtitle": "Настройки приватности и стрима",
    "extra.tabHiding": "Скрытие",
    "extra.tabMasking": "Маскировка",
    "extra.subtabsAria": "Доп. настройки",
    "extra.opponent": "Соперник",
    "extra.maskOppName": "Скрыть имя пользователя",
    "extra.hideOppRating": "Скрыть рейтинг",
    "extra.hideOppFlag": "Скрыть флаг страны",
    "extra.maskOppAvatar": "Скрыть аватар",
    "extra.streamerMode": "Режим стримера",
    "extra.streamerDesc": "Маскирует ваше имя, флаг и аватар одновременно.",
    "extra.hideSelfRating": "Скрыть мой рейтинг",
    "extra.fakeNamesLabel": "Фальшивые имена для соперника",
    "extra.fakeNamesHint": "Разделяйте запятыми. Если оставить пустым, используется ###SecretUser###. Один соперник получает одно и то же имя на всю сессию.",
    "extra.fakeNamesPlaceholder": "Напр.: HiddenFoe, AnonPlayer, ???",
    "extra.avatarUrlsLabel": "URL аватаров для соперника",
    "extra.avatarUrlsHint": "По одному URL в строке. Если оставить пустым, используется встроенный HiddenAvatar.png (файл можно заменить на своё изображение).",
    "extra.selfNameLabel": "Ваше имя в стриме",
    "extra.selfNameHint": "Показывается вместо вашего имени, когда включён режим стримера. Если пусто, используется список для соперника.",
    "extra.selfNamePlaceholder": "Напр.: MysticPlayer",
    "extra.selfAvatarLabel": "Ваш аватар в стриме",
    "extra.selfAvatarHint": "Показывается вместо вашего аватара, когда включён режим стримера. Если пусто, используются настройки аватара соперника.",
    "extra.selfAvatarPlaceholder": "https://example.com/my-avatar.png",
};