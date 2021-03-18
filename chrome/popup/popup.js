document.addEventListener("DOMContentLoaded", (event) => {
    const switchElement = document.getElementById("switchElement")
    const languageSelector = document.getElementById("language-selector")
    console.log("switchElement", switchElement.value)
    console.log("languageSelector", languageSelector.value)
    chrome.storage.sync.get(['autorun'], ({ autorun }) => {
        switchElement.checked = autorun
    })
    chrome.storage.sync.get(['language'], ({ language }) => {
        languageSelector.value = language
    })
    switchElement.addEventListener('change', (e) => {
        chrome.storage.sync.set({ autorun: e.target.checked })
    })
    languageSelector.addEventListener('change', e => {
        chrome.storage.sync.set({ language: e.target.value })
    })
})

const onSelectChange = (e) => {
    console.log(e)
}