# Felo/Perplexity Assemble

## 簡介

快速使用 Felo 與 Perplexity 兩大 AI 搜尋服務，彙整並摘要目前網頁內容。

## 功能特色

- 支援 Felo 與 Perplexity 兩種服務，快速將當前頁面或連結送往 AI 搜尋彙整。
- 右鍵選單支援頁面、連結、圖片、影音等多種情境。
- 內建多組快捷鍵，支援自訂。
- 圖示與截圖展示於 `images/` 與 `store/` 資料夾。

## 安裝與權限

- `contextMenus`：建立右鍵選單
- `activeTab`：取得當前分頁網址

## 使用說明

### 1. 點選工具列圖示

- 預設以 Felo 於新分頁彙整當前頁面

### 2. 右鍵選單

- **頁面/圖片/影音**：
  - `彙整此頁 (Felo)`
  - `彙整此頁 (Perplexity)`
- **連結**：
  - `彙整此頁 (Felo)`
  - `在新分頁彙整此頁 (Felo)`
  - `彙整此頁 (Perplexity)`
  - `在新分頁彙整此頁 (Perplexity)`

### 3. 快捷鍵

- `Alt+S`：Felo 彙整此頁
- `Alt+Shift+S`：Felo 在新分頁彙整此頁
- `Alt+P`：Perplexity 彙整此頁
- `Alt+Shift+P`：Perplexity 在新分頁彙整此頁
- 可至 [chrome://extensions/shortcuts](chrome://extensions/shortcuts) 自訂快捷鍵配置

## 注意事項

有些網站可能因防爬蟲或回應較慢導致 Felo/Perplexity 無法顯示彙整內容，建議可重送一次。
