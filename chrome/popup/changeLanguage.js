chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let key in changes) {
        let storageChange = changes[key]
        if (key === 'language') {
            setLanguage(storageChange.newValue)
        }
    }
})

chrome.storage.sync.get(['language'], ({ language }) => {
    setLanguage(language)
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