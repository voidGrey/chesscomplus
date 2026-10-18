// ============================================================
// locales/zh.js — 简体中文 (Basitleştirilmiş Çince) sözlüğü
//
// Bu dosya kendini global CPLUS_LOCALES koleksiyonuna kaydeder; i18n.js'den
// ÖNCE yüklenmelidir. Yeni çeviri için bu dosyayı kopyalayıp dil koduyla
// adlandırın (örn. ko.js), içeriği çevirin ve her sayfadaki script
// listesine i18n.js SATIRININ ÜSTÜNE ekleyin.
// ============================================================

(globalThis.CPLUS_LOCALES = globalThis.CPLUS_LOCALES || {})["zh"] = {
    langName: "中文（简体）",
    flag: "cn",

    // Alt sekme çubuğu
    "tabs.settings": "Settings+",
    "tabs.themes": "主题",
    "tabs.extra": "更多设置",
    "tabs.aria": "页面",
    "common.language": "语言",

    // Settings+ (popup.html)
    "popup.subtitle": "自定义你的棋盘",
    "popup.siteBackground": "网站背景",
    "popup.lightSquares": "浅色格",
    "popup.darkSquares": "深色格",
    "popup.buttonColor": "按钮颜色",
    "popup.resetSiteBackground": "重置网站背景",
    "popup.resetLightSquares": "重置浅色格颜色",
    "popup.resetDarkSquares": "重置深色格颜色",
    "popup.resetButtonColor": "重置按钮颜色",
    "popup.saveTheme": "保存主题",
    "popup.themeNamePlaceholder": "主题名称...",
    "popup.themeExists": '已存在使用相同配色的主题："{name}"',

    // Themes
    "themes.subtitle": "现成的棋盘与背景配色",
    "themes.boardTheme": "棋盘主题",
    "themes.siteBackground": "Site background",
    "themes.buttonColor": "Button color",
    "themes.custom": "自定义",
    "themes.customThemes": "自定义主题",
    "themes.board.default": "默认",
    "themes.board.darkBlue": "深蓝 +",
    "themes.board.wood": "木质",
    "themes.board.sky": "天空",
    "themes.board.purple": "紫色",
    "themes.board.slate": "石板",
    "themes.board.rose": "玫瑰",
    "themes.bg.default": "默认",
    "themes.bg.darker": "极暗",
    "themes.bg.black": "纯黑",
    "themes.bg.navy": "海军蓝",
    "themes.bg.forest": "森林",
    "themes.bg.plum": "梅子",
    "themes.bg.coffee": "咖啡",
    "themes.button.default": "默认",
    "themes.button.orange": "橙色",
    "themes.button.sea": "海洋",

    // Extra Settings
    "extra.subtitle": "隐私与直播设置",
    "extra.tabHiding": "隐藏",
    "extra.tabMasking": "伪装",
    "extra.subtabsAria": "更多设置",
    "extra.opponent": "对手",
    "extra.maskOppName": "伪装用户名",
    "extra.hideOppRating": "隐藏等级分",
    "extra.hideOppFlag": "隐藏国旗",
    "extra.maskOppAvatar": "伪装头像",
    "extra.streamerMode": "主播模式",
    "extra.streamerDesc": "一次性伪装你的用户名、国旗和头像。",
    "extra.hideSelfRating": "隐藏我的等级分",
    "extra.fakeNamesLabel": "对手的假名",
    "extra.fakeNamesHint": "用逗号分隔填写。留空则使用 ###SecretUser###。同一对手在本次会话中始终使用同一个假名。",
    "extra.fakeNamesPlaceholder": "例如：HiddenFoe, AnonPlayer, ???",
    "extra.avatarUrlsLabel": "对手的头像 URL",
    "extra.avatarUrlsHint": "每行填写一个地址。留空则使用扩展内置的 HiddenAvatar.png（你可以将该文件替换为自己的图片）。",
    "extra.selfNameLabel": "你的直播名称",
    "extra.selfNameHint": "主播模式开启时，代替你的用户名显示。留空则使用对手的名称列表。",
    "extra.selfNamePlaceholder": "例如：MysticPlayer",
    "extra.selfAvatarLabel": "你的直播头像",
    "extra.selfAvatarHint": "主播模式开启时，代替你的头像显示。留空则使用对手的头像设置。",
    "extra.selfAvatarPlaceholder": "https://example.com/my-avatar.png",
};