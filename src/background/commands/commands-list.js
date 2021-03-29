const enRegExp = {
    next: "(next +tab)",
    prev: "(previous +tab)",
    close: "((close|remove|delete) +tab)",
    new: "((new|create) +tab)",
    search: "((search|find) +.+)",
    searchText: "((search|find) +)",
    chnageLanguage: "(change +language( +to)?)",
    more: '^more$',
    site: 'open( +site)?( *([\\w\\d\\-.]{1,64}\\.\\w{2,6})? *)?(page)?'
}

const ruRegExp = {
    next: "(следующ(ая|ую) +вкладк(а|у))",
    prev: "(предыдущ(ая|ую) +вкладк(а|у))",
    close: "(закр(ыть|ой) +вкладк(а|у))",
    new: "(нов(ая|ую) +вкладк(а|у))",
    search: "((поиск|най(д|т)и)) +.+",
    searchText: "((поиск|най(д|т)и) +)",
    chnageLanguage: "(поменя(й|ть) +язык( +на)?)",
    more: '^(ещ(ё|е))$',
    site: 'открой( +сайт|страницу)?( *([\\w\\d\\-.]{1,64}\\.\\w{2,6})? *)?'
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