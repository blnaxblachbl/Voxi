document.addEventListener("DOMContentLoaded", (event) => {
    const switchElement = document.getElementById("switchElement")
    console.log("switchElement", switchElement.value)
    chrome.storage.sync.get(['autorun'], ({ autorun }) => {
        switchElement.checked = autorun
    })
    switchElement.addEventListener('change', (e) => {
        chrome.storage.sync.set({ autorun: e.target.checked })
    })
})