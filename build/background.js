/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************************!*\
  !*** ./src/background/index.js ***!
  \*********************************/
chrome.runtime.onInstalled.addListener(() => {
    console.log("installed")
})

chrome.tabs.onActivated.addListener(({ tabId }) => {
    console.log('Message sended to #' + tabId)
    chrome.tabs.sendMessage(
        tabId,
        "focused",
        null
    )
})

chrome.runtime.onMessage.addListener(async (message) => {
    console.log("message", message)
    if (message.includes('tab')) {
        const current = await chrome.tabs.query({ active: true, currentWindow: true })
        const allTabs = await chrome.tabs.query({ groupId: current[0].groupId })
        const allTabsIds = allTabs.map(item => item.id)
        const currentTabIndex = allTabsIds.indexOf(current[0].id)
        if (message.includes('next')) {
            console.log("next")
            if (currentTabIndex !== -1) {
                if (currentTabIndex + 1 <= allTabsIds.length - 1) {
                    chrome.tabs.update(allTabsIds[currentTabIndex + 1], { selected: true })
                } else {
                    chrome.tabs.update(allTabsIds[0], { selected: true })
                }
            }
        }
        if (message.includes('prev')) {
            if (currentTabIndex !== -1) {
                if (currentTabIndex - 1 >= 0) {
                    chrome.tabs.update(allTabsIds[currentTabIndex - 1], { selected: true })
                } else {
                    chrome.tabs.update(allTabsIds[allTabsIds.length - 1], { selected: true })
                }
            }
        }
    }
})
/******/ })()
;
//# sourceMappingURL=background.js.map