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