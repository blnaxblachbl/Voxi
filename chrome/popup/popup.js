document.addEventListener("DOMContentLoaded", (event) => {
    const switchElement = document.getElementById("switchElement")
    const languageSelector = document.getElementById("language-selector")
    const settingsButtoon = document.getElementById("settingsButtoon")
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
    settingsButtoon.addEventListener('click', async () => {
        const voxiTab = await chrome.tabs.query({
            url: 'chrome-extension://aneandehgfkgcaodckhobnmencgjbclm/worker/worker.html'
        })
        if (voxiTab.length === 0) {
            chrome.tabs.create({
                active: true,
                index: 0,
                pinned: true,
                url: 'worker/worker.html'
            })
        } else {
            chrome.tabs.update(voxiTab[0].id, { active: true })
        }
    })
})