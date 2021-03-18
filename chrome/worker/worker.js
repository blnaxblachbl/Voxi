const en = {
    reload: "reload",
    down: 'down',
    lower: "lower",
    up: "up",
    higher: "higher",
    bottom: "bottom",
    top: "top",
    more: "more",
    click: "click",
    back: "back",
    forward: "forward"
}

const ru = {
    reload: "перезагрузить",
    down: 'вниз',
    lower: "ниже",
    up: "вверх",
    higher: "выше",
    bottom: "конец",
    top: "начало",
    more: "еще",
    click: "нажми",
    back: "назад",
    forward: "вперёд"
}

document.addEventListener("DOMContentLoaded", (event) => {
    const switchElement = document.getElementById("switchElement")
    const languageSelector = document.getElementById("language-selector")
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
    
    languageSelector.addEventListener('change', e => {
        chrome.storage.sync.set({ language: e.target.value })
        setLanguage(e.target.value)
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

const setLanguage = (lang) => {
    const title = document.getElementById("title")
    const active = document.getElementById("active")
    const language = document.getElementById("language-label")
    if (lang === 'ru-RU') {
        title.innerText = 'Добро пожаловать в настройки "Voxi"'
        active.innerText = "Включино"
        language.innerText = "Языки"
    } else {
        title.innerText = 'Wellcome to "Voxi" settings page'
        active.innerText = "Autorun"
        language.innerText = "Languages"
    }
}