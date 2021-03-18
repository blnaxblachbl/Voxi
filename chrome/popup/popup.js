document.addEventListener("DOMContentLoaded", (event) => {
    const title = document.getElementById("title")
    const switchElement = document.getElementById("switchElement")
    const languageSelector = document.getElementById("language-selector")
    const settingsButtoon = document.getElementById("settingsButtoon")

    chrome.storage.sync.get(['autorun'], ({ autorun }) => {
        switchElement.checked = autorun
    })
    chrome.storage.sync.get(['language'], ({ language }) => {
        languageSelector.value = language
        setLanguage(language)
    })
    chrome.storage.onChanged.addListener((changes, namespace) => {
        for (let key in changes) {
            let storageChange = changes[key]
            if (key === 'language') {
                setLanguage(storageChange.newValue)
            }
        }
    })
    
    switchElement.addEventListener('change', (e) => {
        chrome.storage.sync.set({ autorun: e.target.checked })
    })
    languageSelector.addEventListener('change', e => {
        chrome.storage.sync.set({ language: e.target.value })
        setLanguage(e.target.value)
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

const setLanguage = (lang) => {
    const title = document.getElementById("title")
    const autorun = document.getElementById("autorun")
    const language = document.getElementById("language-label")
    const settings = document.getElementById("settingsButtoon")
    if (lang === 'ru-RU') {
        title.innerText = 'Добро пожаловать в голосовой помощник - "Voxi"'
        autorun.innerText = "Автозапуск"
        language.innerText = "Языки"
        settings.innerText = "Настройки"
    } else {
        title.innerText = 'Wellcome to "Voxi" voice interface'
        autorun.innerText = "Autorun"
        language.innerText = "Languages"
        settings.innerText = "Settings"
    }
}