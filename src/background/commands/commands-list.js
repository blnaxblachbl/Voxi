const en = {
    tab: "tab", //(tab)
    next: "next", //(next +tab)
    prev: "prev", //(previous +tab)
    close: "close", //((close|remove|delete) +tab)
    new: "new", //((new|create) +tab)
    create: "create", //((new|create) +tab)
    search: "search", //(search|find)
    find: "find" //(search|find)
}

const ru = {
    tab: "вкладка", //(вкладка)
    next: "следующ", //((следующ(ая|ую) +вкладк(а|у)))
    prev: "предыдущ", //((предыдущ(ая|ую) +вкладк(а|у)))
    close: "закрыть", //(закрыть +вкладк(а|у)))
    new: "новая", //(нов(ая|ую) +вкладк(а|у)))
    create: "открыть", //(нов(ая|ую) +вкладк(а|у)))
    search: "поиск", //(поиск|най(д|т)и)
    find: "найди" //(поиск|най(д|т)и)
}

const enRegExp = {
    next: "(next +tab)",
    prev: "(previous +tab)",
    close: "((close|remove|delete) +tab)",
    new: "((new|create) +tab)",
    search: "(search|find)"
}

const ruRegExp = {
    next: "(следующ(ая|ую) +вкладк(а|у))",
    prev: "(предыдущ(ая|ую) +вкладк(а|у))",
    close: "(закр(ыть|ой) +вкладк(а|у))",
    new: "(нов(ая|ую) +вкладк(а|у))",
    search: "(поиск|най(д|т)и)"
}

let commandsList = enRegExp

chrome.storage.sync.get(['language'], ({ language }) => {
    if (language == 'ru-RU') {
        commandsList = ruRegExp
    } else {
        commandsList = enRegExp
    }
})

chrome.storage.onChanged.addListener(async (changes, namespace) => {
    for (let key in changes) {
        let storageChange = changes[key]
        if (key === 'language') {
            if (storageChange.newValue === 'ru-RU') {
                commandsList = ruRegExp
            } else {
                commandsList = enRegExp
            }
        }
    }
})

export {
    commandsList
}