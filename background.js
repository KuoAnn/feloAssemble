const feloSearchOfficalUrl = "https://felo.ai/search";

function openInFeloSearch(url, tab, inNewTab = false) {
    const feloSearchUrl = `${feloSearchOfficalUrl}?q=${encodeURIComponent(url)}`;
    
    if (inNewTab) {
        chrome.tabs.create({ url: feloSearchUrl });
    } else {
        chrome.tabs.update(tab.id, { url: feloSearchUrl });
    }
}

// 當擴充功能安裝或更新時，建立右鍵選單
chrome.runtime.onInstalled.addListener(() => {
    // 為超連結建立右鍵選單
    chrome.contextMenus.create({
        id: "feloSearchCurrentTab",
        title: "彙整此頁",
        contexts: ["link"],
    });

    chrome.contextMenus.create({
        id: "feloSearchNewTab",
        title: "在新分頁彙整此頁",
        contexts: ["link"],
    });

    chrome.contextMenus.create({
        id: "searchWithFelo",
        title: "彙整此頁",
        contexts: ["page"],
    });
});

// 處理右鍵選單點擊事件
chrome.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case "searchWithFelo":
            openInFeloSearch(tab.url, tab, false);
            break;
        case "feloSearchCurrentTab":
            openInFeloSearch(info.linkUrl, tab, false);
            break;
        case "feloSearchNewTab":
            openInFeloSearch(info.linkUrl, tab, true);
            break;
    }
});

// 處理工具列按鈕點擊事件
chrome.action.onClicked.addListener((tab) => {
    openInFeloSearch(tab.url, tab, true);
});

// 處理快捷鍵事件
chrome.commands.onCommand.addListener((command) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            const tab = tabs[0];
            
            if (command === "open-in-current-tab") {
                openInFeloSearch(tab.url, tab, false);
            } else if (command === "open-in-new-tab") {
                openInFeloSearch(tab.url, tab, true);
            }
        }
    });
});
