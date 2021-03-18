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