// 建立右鍵選單
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "searchWithFelo",
    title: "Felo Search 彙整",
    contexts: ["page"]
  });
});

// 處理右鍵選單點擊事件
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "searchWithFelo") {
    const currentUrl = tab.url;
    const feloSearchUrl = `https://felo.ai/search?q=${encodeURIComponent(currentUrl)}`;
    chrome.tabs.create({ url: feloSearchUrl });
  }
});

chrome.action.onClicked.addListener((tab) => {
  // 取得當前分頁的 URL
  const currentUrl = tab.url;
  
  // 建立 Felo 搜尋的 URL，將當前頁面的 URL 帶入
  const feloSearchUrl = `https://felo.ai/search?q=${encodeURIComponent(currentUrl)}`;
  
  // 開啟新分頁並導向 Felo 搜尋
  chrome.tabs.create({ url: feloSearchUrl });
});
