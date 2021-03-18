const en = {
    "Reload page": "reload",
    "Scroll down": 'down or lower',
    'Scroll up': "up or higher",
    'Scrollt to bottom of page': "bottom",
    'Scroll to top of page': "top",
    'Repeat last comand': "more",
    'Click on something': "click... {and say number of element}",
    'Back to previous page': "back",
    'Move to forward page': "forward"
}

const ru = {
    'Перезагрузить стрницу': "перезагрузить",
    "Проскроллить вниз": 'вниз/ниже',
    "Проскроллить вверх": "вверх/выше",
    "Проскроллить на конец страницы": "конец",
    "Проскроллить на начало страницы": "начало",
    "Повторить предыдущее действие": "еще",
    "Нажать на какой нибудь объект": "нажми... {произнесите номер объекта}",
    "Перейти на предыдущую страницу": "назад",
    "Перейти на следующую страницу": "вперёд"
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
        addCommandsList(language)
    })
    chrome.storage.onChanged.addListener((changes, namespace) => {
        for (let key in changes) {
            let storageChange = changes[key]
            if (key === 'language') {
                setLanguage(storageChange.newValue)
                addCommandsList(storageChange.newValue)
            }
        }
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

const addCommandsList = (lang) => {
    const obj = lang === 'ru-RU' ? ru : en
    const kyes = Object.keys(obj)
    const values = Object.values(obj)

    const space = document.getElementById('commands-container')
    const parent = document.createElement("div")
    parent.setAttribute('class', 'commands-content')

    for (let i = 0; i < kyes.length; i++) {
        const div = document.createElement('div')
        const key = document.createElement('div')
        const value = document.createElement('div')
        div.setAttribute("class", "row")
        key.setAttribute('class', 'key')
        value.setAttribute('class', 'value')
        key.innerText = kyes[i]
        value.innerText = values[i]
        div.appendChild(key)
        div.appendChild(value)
        parent.appendChild(div)
    }
    console.log(space.childNodes)
    space.replaceChild(parent, space.childNodes[0])
}

const setLanguage = (lang) => {
    const title = document.getElementById("title")
    const active = document.getElementById("active")
    const language = document.getElementById("language-label")
    const commandsTitle = document.getElementById("commands-title")
    if (lang === 'ru-RU') {
        title.innerText = 'Добро пожаловать в настройки "Voxi"'
        active.innerText = "Включино"
        language.innerText = "Языки"
        commandsTitle.innerText = "Список команд:"
    } else {
        title.innerText = 'Wellcome to "Voxi" settings page'
        active.innerText = "Autorun"
        language.innerText = "Languages"
        commandsTitle.innerText = "Commands list:"
    }
}