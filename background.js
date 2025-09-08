
const feloSearchOfficalUrl = "https://felo.ai/search";
const perplexityOfficialUrl = "https://www.perplexity.ai/";

function openInService(service, url, tab, inNewTab = false) {
    let targetUrl = '';
    if (service === 'felo') {
        targetUrl = `${feloSearchOfficalUrl}?q=${encodeURIComponent(url)}`;
    } else if (service === 'perplexity') {
        targetUrl = `${perplexityOfficialUrl}?q=${encodeURIComponent(url)}`;
    }
    if (inNewTab) {
        chrome.tabs.create({ url: targetUrl });
    } else {
        chrome.tabs.update(tab.id, { url: targetUrl });
    }
}

// 工具列按鈕點擊事件
chrome.action.onClicked.addListener((tab) => {
    // 預設用 Felo 開新分頁
    openInService('felo', tab.url, tab, true);
});

// 建立右鍵選單
chrome.runtime.onInstalled.addListener(() => {
    // Felo
    chrome.contextMenus.create({
        id: "feloSearchCurrentTab",
        title: "彙整此頁 (Felo)",
        contexts: ["link"],
    });
    chrome.contextMenus.create({
        id: "feloSearchNewTab",
        title: "在新分頁彙整此頁 (Felo)",
        contexts: ["link"],
    });
    chrome.contextMenus.create({
        id: "searchWithFelo",
        title: "彙整此頁 (Felo)",
        contexts: ["page", "image", "video", "audio"],
    });
    // Perplexity
    chrome.contextMenus.create({
        id: "perplexitySearchCurrentTab",
        title: "彙整此頁 (Perplexity)",
        contexts: ["link"],
    });
    chrome.contextMenus.create({
        id: "perplexitySearchNewTab",
        title: "在新分頁彙整此頁 (Perplexity)",
        contexts: ["link"],
    });
    chrome.contextMenus.create({
        id: "searchWithPerplexity",
        title: "彙整此頁 (Perplexity)",
        contexts: ["page", "image", "video", "audio"],
    });
});

// 處理右鍵選單點擊事件
chrome.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        // Felo
        case "searchWithFelo":
            openInService('felo', tab.url, tab, false);
            break;
        case "feloSearchCurrentTab":
            openInService('felo', info.linkUrl, tab, false);
            break;
        case "feloSearchNewTab":
            openInService('felo', info.linkUrl, tab, true);
            break;
        // Perplexity
        case "searchWithPerplexity":
            openInService('perplexity', tab.url, tab, false);
            break;
        case "perplexitySearchCurrentTab":
            openInService('perplexity', info.linkUrl, tab, false);
            break;
        case "perplexitySearchNewTab":
            openInService('perplexity', info.linkUrl, tab, true);
            break;
    }
});

// 處理快捷鍵事件
chrome.commands.onCommand.addListener((command) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            const tab = tabs[0];
            if (command === "open-in-current-tab") {
                openInService('felo', tab.url, tab, false);
            } else if (command === "open-in-new-tab") {
                openInService('felo', tab.url, tab, true);
            } else if (command === "open-in-current-tab-perplexity") {
                openInService('perplexity', tab.url, tab, false);
            } else if (command === "open-in-new-tab-perplexity") {
                openInService('perplexity', tab.url, tab, true);
            }
        }
    });
});
