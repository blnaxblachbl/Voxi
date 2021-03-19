const en = {
    tab: "tab",
    next: "next",
    prev: "prev",
    close: "close",
    new: "new",
    create: "create",
    search: "search",
    find: "find"
}

const ru = {
    tab: "вкладка",
    next: "следующ",
    prev: "предыдуш",
    close: "закрыть",
    new: "новая",
    create: "открыть",
    search: "поиск",
    find: "найди"
}

let commandsList = en

chrome.storage.sync.get(['language'], ({ language }) => {
    if (language == 'ru-RU') {
        commandsList = ru
    } else {
        commandsList = en
    }
})

chrome.storage.onChanged.addListener(async (changes, namespace) => {
    for (let key in changes) {
        let storageChange = changes[key]
        if (key === 'language') {
            if (storageChange.newValue === 'ru-RU') {
                commandsList = ru
            } else {
                commandsList = en
            }
        }
    }
})

export {
    commandsList
}