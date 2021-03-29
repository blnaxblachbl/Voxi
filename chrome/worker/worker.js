const en = {
    "Reload page": 'To reload page say "reload" or "refresh"',
    "Scroll down": 'To scroll down say "down" or "lower"',
    'Scroll up': 'To scroll up say "up" or "higher"',
    'Scroll to bottom of page': 'To scroll to the bottom of page say "bottom" of "scroll to bottom"',
    'Scroll to top of page': 'To scroll to the bottom of page say "top" or "scroll to top"',
    'Repeat last comand': 'To repeat last command say "more"',
    'Click on something': 'To click on some element sey the text of the element or say "click" or "press" and number of element',
    'Select mode:': 'If Voxi find several variants of elements, you will see the selected element. If the item doesnt match what you want to click you can change it. To change select say "next" to switch to next item ot "previous" to select previous item. If item is match say "press" or "select" to click it. To cencel selection say "cancel". Select mode will cancel automaticly after 15 second.',
    'Write mode': 'If clicked element is text input write mode will activeted. If mode is activated what ever you sat will writed to input. After you end speeking wite mode will turn off.',
    'Back to previous page': 'To navigate back to previous page say "back"',
    'Move to forward page': 'To navigate to next page say "forward"',
    "Select next tab": 'To open next browser tab say "next tab"',
    "Select previous tab": 'To opne previous browser tab say "previous tab"',
    "Close current tab": 'To close curent brouser tab say "close tab"',
    "Open new tab": 'To open new tab say "create tab" or "open new tab"',
    "Search somethiing in google": 'To search something say "search" or "find" and say search text',
    "Open site": 'To open site say "open" and say site name. Example: "open instagram.com"'
}

const ru = {
    'Перезагрузить стрницу': 'Чтобы обновить страницу скажите "перезагрузить", "перезагрузи", "обновить" или "обнови"',
    "Проскроллить вниз": 'Чтобы пролистать страницу вниз скажите "вниз" или "ниже"',
    "Проскроллить вверх": 'Чтобы пролистать страницу вниз скажите "вверх" или "выше"',
    "Проскроллить на конец страницы": 'Чтобы пролистать в конец страницы, скажите "в конец" или "к концу"',
    "Проскроллить на начало страницы": 'Чтобы пролистать к началу страницы, скажите "в начало" или "к началу"',
    "Повторить предыдущее действие": 'Чтобы повториь проследнюю команду, скажите "еще"',
    "Нажать на какой нибудь объект": 'Чтобы нажать на объект, произнесите тект элемента или скажите "нажми на..." и следом произнесите номер объекта',
    "Режим выбора": 'Если Voxi найдет несколько элементов с произнесенным текстом, то включиться режим выделения и вы увидите выделенный объект с зеленым фоном. Вы можете выделить к следующему элемнт, соответсвующий запросу. Чтобы выделить следующий элемент, скажите "далее" или "назад". Чтобы выделить предыдущий элемнт, скажите "назад". Чтобы нажать на выделенный элемент, скажите "выбрать" или "нажать"',
    "Режим воода текста": 'Если нажатый вами элемент является полем ввода текста, то после нажатия автивируется режим ввода текста. Все что вы скажите будет записано в данное поле. После окончания произножшения вы снова сможете задавать комманды.',
    "Перейти на предыдущую страницу": 'Чтобы перейти на предыдущую страницу, скажите "назад"',
    "Перейти на следующую страницу": 'Чтобы перейти на следующую страницу, скажите "вперёд"',
    "Перейти на следующую вкладку": 'Чтобы открыть следующую вкладку браузера, скажите "следующая вкладка"',
    "Перейти на предыдущий таб": 'Чтобы открыть предыдущую вкладку браузера, скажте "предыдущая вкладка"',
    "Закрыть текущую вкладку": 'Чтобы закрыть текующую вкладку браузера, скажите "закрыть вкладку"',
    "Открыть новую вкладку": 'Чтобы открыть новыую вкладку браузера, скажите "новая вкладка" или "создать вкладку"',
    "Сделать поисковый запрос": 'Чтобы сделать поиск, скажите "поиск" или "найди" и следом произнесите то что хотите найти',
    "Открыть сайт": 'Чтобы открыть сайт, скажите "открыть" и следом произнесите имя сайта. Пример: "отрктой instagram.com"'
}


document.addEventListener("DOMContentLoaded", (event) => {
    const switchElement = document.getElementById("switchElement")
    const languageSelector = document.getElementById("language-selector")
    chrome.storage.sync.get(['autorun', 'language'], ({ autorun, language }) => {
        switchElement.checked = autorun
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
            if (key === 'autorun') {
                switchElement.checked = storageChange.newValue
            }
        }
    })

    languageSelector.addEventListener('change', e => {
        chrome.storage.sync.set({ language: e.target.value })
    })

    switchElement.addEventListener('change', (e) => {
        if (e.target.checked) {
            setTimeout(() => {
                chrome.storage.sync.set({ autorun: true })
            }, 500)
        } else {
            chrome.storage.sync.set({ autorun: false })
        }
    })
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
    if (space.childNodes.length > 0) {
        space.replaceChild(parent, space.childNodes[0])
    } else {
        space.appendChild(parent)
    }
}

const setLanguage = (lang) => {
    const title = document.getElementById("title")
    const active = document.getElementById("active")
    const language = document.getElementById("language-label")
    const commandsTitle = document.getElementById("commands-title")
    const settingsTitle = document.getElementById("settings-title")
    const languageSelector = document.getElementById("language-selector")
    if (lang === 'ru-RU') {
        title.innerText = 'Добро пожаловать в настройки "Voxi"'
        active.innerText = "Автозапуск"
        language.innerText = "Языки"
        settingsTitle.innerText = "Настройки:"
        commandsTitle.innerText = "Список команд:"
        for (let i = 0; i < languageSelector.childNodes.length; i++) {
            languageSelector.childNodes[i].innerText = languageSelector.childNodes[i].value === 'ru-RU' ? "Русский" : "Английский"
        }
    }
    if (lang === 'en-US') {
        title.innerText = 'Wellcome to "Voxi" settings page'
        active.innerText = "Autorun"
        language.innerText = "Languages"
        settingsTitle.innerText = "Settings:"
        commandsTitle.innerText = "Commands list:"
        for (let i = 0; i < languageSelector.childNodes.length; i++) {
            languageSelector.childNodes[i].innerText = languageSelector.childNodes[i].value === 'ru-RU' ? "Russian" : "English"
        }
    }
}