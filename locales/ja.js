// ============================================================
// locales/ja.js — 日本語 sözlüğü
//
// Bu dosya kendini global CPLUS_LOCALES koleksiyonuna kaydeder; i18n.js'den
// ÖNCE yüklenmelidir. Yeni çeviri için bu dosyayı kopyalayıp dil koduyla
// adlandırın (örn. zh.js), içeriği çevirin ve her sayfadaki script
// listesine i18n.js SATIRININ ÜSTÜNE ekleyin.
// ============================================================

(globalThis.CPLUS_LOCALES = globalThis.CPLUS_LOCALES || {})["ja"] = {
    langName: "日本語",
    flag: "jp",

    // Alt sekme çubuğu
    "tabs.settings": "Settings+",
    "tabs.themes": "テーマ",
    "tabs.extra": "追加設定",
    "tabs.aria": "ページ",
    "common.language": "言語",

    // Settings+ (popup.html)
    "popup.subtitle": "チェスボードを自分好みにカスタマイズ",
    "popup.siteBackground": "サイトの背景",
    "popup.lightSquares": "白いマス",
    "popup.darkSquares": "黒いマス",
    "popup.buttonColor": "ボタンの色",
    "popup.resetSiteBackground": "サイトの背景をリセット",
    "popup.resetLightSquares": "白いマスの色をリセット",
    "popup.resetDarkSquares": "黒いマスの色をリセット",
    "popup.resetButtonColor": "ボタンの色をリセット",

    // Themes
    "themes.subtitle": "すぐ使えるボードと背景のカラーテーマ",
    "themes.boardTheme": "ボードのテーマ",
    "themes.siteBackground": "サイトの背景",
    "themes.buttonColor": "ボタンの色",
    "themes.custom": "カスタム",
    "themes.board.default": "デフォルト",
    "themes.board.darkBlue": "ダークブルー +",
    "themes.board.wood": "ウッド",
    "themes.board.sky": "スカイ",
    "themes.board.purple": "パープル",
    "themes.board.slate": "スレート",
    "themes.board.rose": "ローズ",
    "themes.bg.default": "デフォルト",
    "themes.bg.darker": "より濃い黒",
    "themes.bg.black": "ブラック",
    "themes.bg.navy": "ネイビー",
    "themes.bg.forest": "フォレスト",
    "themes.bg.plum": "プラム",
    "themes.bg.coffee": "コーヒー",
    "themes.button.default": "デフォルト",
    "themes.button.orange": "オレンジ",
    "themes.button.sea": "シー",

    // Extra Settings
    "extra.subtitle": "プライバシーと配信の設定",
    "extra.tabHiding": "プライバシー",
    "extra.tabMasking": "マスキング",
    "extra.subtabsAria": "追加設定",
    "extra.opponent": "対戦相手",
    "extra.maskOppName": "ユーザー名をマスク",
    "extra.hideOppRating": "レーティングを非表示",
    "extra.hideOppFlag": "国旗を非表示",
    "extra.maskOppAvatar": "アバターをマスク",
    "extra.streamerMode": "ストリーマーモード",
    "extra.streamerDesc": "自分のユーザー名・国旗・アバターをまとめてマスクします。",
    "extra.hideSelfRating": "自分のレーティングを非表示",
    "extra.fakeNamesLabel": "対戦相手の偽名",
    "extra.fakeNamesHint": "カンマ区切りで入力。空欄の場合は ###SecretUser### が使われます。同じ相手にはセッション中ずっと同じ偽名が割り当てられます。",
    "extra.fakeNamesPlaceholder": "例: HiddenFoe, AnonPlayer, ???",
    "extra.avatarUrlsLabel": "対戦相手のアバター URL",
    "extra.avatarUrlsHint": "1 行に 1 つの URL を入力。空欄の場合は同梱の HiddenAvatar.png が使われます（ファイルを自分の画像に置き換えられます）。",
    "extra.selfNameLabel": "配信用の名前",
    "extra.selfNameHint": "ストリーマーモード有効時に、自分のユーザー名の代わりに表示されます。空欄の場合は相手用のリストが使われます。",
    "extra.selfNamePlaceholder": "例: MysticPlayer",
    "extra.selfAvatarLabel": "配信用のアバター",
    "extra.selfAvatarHint": "ストリーマーモード有効時に、自分のアバターの代わりに表示されます。空欄の場合は相手用のアバター設定が使われます。",
    "extra.selfAvatarPlaceholder": "https://example.com/my-avatar.png",
    "extra.self": "自分"
};
