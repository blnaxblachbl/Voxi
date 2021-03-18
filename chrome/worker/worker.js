document.addEventListener("DOMContentLoaded", (event) => {
    const switchElement = document.getElementById("switchElement")
    const languageSelector = document.getElementById("language-selector")
    chrome.storage.sync.get(['autorun'], ({ autorun }) => {
        switchElement.checked = autorun
    })
    chrome.storage.sync.get(['language'], ({ language }) => {
        languageSelector.value = language
    })
    languageSelector.addEventListener('change', e => {
        chrome.storage.sync.set({ language: e.target.value })
    })
    // switchElement.addEventListener('change', (e) => {
    //     if (e.target.value) {
    //         recognition.start()
    //         state.started = true
    //     } else {
    //         recognition.stop()
    //         state.started = false
    //     }
    // })
})