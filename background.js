const feloSearchOfficalUrl = "https://felo.ai/search";

// 當擴充功能安裝或更新時，建立右鍵選單
chrome.runtime.onInstalled.addListener(() => {
    // 為超連結建立右鍵選單
    chrome.contextMenus.create({
        id: "feloSearchCurrentTab",
        title: "使用 Felo Search 彙整",
        contexts: ["link"],
    });

    chrome.contextMenus.create({
        id: "feloSearchNewTab",
        title: "以新分頁使用 Felo Search 彙整",
        contexts: ["link"],
    });

    chrome.contextMenus.create({
        id: "searchWithFelo",
        title: "Felo Search 彙整",
        contexts: ["page"],
    });
});

// 處理右鍵選單點擊事件
chrome.contextMenus.onClicked.addListener((info, tab) => {
    const linkUrl = `${feloSearchOfficalUrl}?q=${encodeURIComponent(info.linkUrl)}`;
    const currentUrl = `${feloSearchOfficalUrl}?q=${encodeURIComponent(tab.url)}`;

    switch (info.menuItemId) {
        case "searchWithFelo":
            // 在當前頁開啟
            chrome.tabs.update(tab.id, { url: currentUrl });
            break;
        case "feloSearchCurrentTab":
            // 在當前頁開啟
            chrome.tabs.update(tab.id, { url: linkUrl });
            break;
        case "feloSearchNewTab":
            // 在新分頁開啟
            chrome.tabs.create({ url: linkUrl });
            break;
    }
});

// 處理工具列按鈕點擊事件
chrome.action.onClicked.addListener((tab) => {
    const url = tab.url;
    const feloSearchUrl = `${feloSearchOfficalUrl}?q=${encodeURIComponent(url)}`;

    // 在當前分頁開啟 Felo Search
    chrome.tabs.create({ url: feloSearchUrl });
});

// 處理快捷鍵事件
chrome.commands.onCommand.addListener((command) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            const tab = tabs[0];
            const url = tab.url;
            const feloSearchUrl = `${feloSearchOfficalUrl}?q=${encodeURIComponent(url)}`;

            if (command === "open-in-current-tab") {
                // 在當前分頁開啟
                chrome.tabs.update(tab.id, { url: feloSearchUrl });
            } else if (command === "open-in-new-tab") {
                // 在新分頁開啟
                chrome.tabs.create({ url: feloSearchUrl });
            }
        }
    });
});
