document.addEventListener("DOMContentLoaded", (event) => {
    const switchElement = document.getElementById("switchElement")
    const languageSelector = document.getElementById("language-selector")
    const settingsButtoon = document.getElementById("settingsButtoon")

    chrome.storage.sync.get(['autorun', 'language'], ({ autorun, language }) => {
        switchElement.checked = autorun
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
        // chrome.storage.sync.set({ started: e.target.value })
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
    const languageSelector = document.getElementById("language-selector")
    if (lang === 'ru-RU') {
        title.innerText = 'Добро пожаловать в голосовой помощник - "Voxi"'
        autorun.innerText = "Автозапуск"
        language.innerText = "Языки"
        settings.innerText = "Начать"
        for (let i = 0; i < languageSelector.childNodes.length; i++) {
            languageSelector.childNodes[i].innerText = languageSelector.childNodes[i].value === 'ru-RU' ? "Русский" : "Английский"
        }
    } else {
        title.innerText = 'Wellcome to "Voxi" voice interface'
        autorun.innerText = "Autorun"
        language.innerText = "Languages"
        settings.innerText = "Start"
        for (let i = 0; i < languageSelector.childNodes.length; i++) {
            languageSelector.childNodes[i].innerText = languageSelector.childNodes[i].value === 'ru-RU' ? "Russian" : "English"
        }
    }
}