const en = {
    reload: "reload", //(reload|refresh)
    down: 'down', //(down|lower)
    lower: "lower", //(down|lower)
    up: "up", //(up|higher)
    higher: "higher", //(up|higher)
    bottom: "bottom", //(bottom)
    top: "top",  //(^| )(top)($| )
    more: "more",  //(^| )(more)($| )
    click: "click", //(((click|press)( on)?)).*(\d)+
    back: "back", //(back|(previous +page))
    forward: "forward" //(forward|(next +page))
}

const ru = {
    reload: "перезагрузить", //(перезагрузи(ть)?|обнови(ть)?)
    down: 'вниз', //(вниз|ниже)
    lower: "ниже", //(вниз|ниже)
    up: "вверх", //(вверх|выше)
    higher: "выше", //(вверх|выше)
    bottom: "конец", //(кон(ец|цу))
    top: "начало", //(начал(о|а|у))
    more: "ещё", //(ещ(ё|е))
    click: "нажми", //(((нажми)( на)?)|(откр(ой|ыть))).*(\d)+
    back: "назад", //(назад|(предыдущ(ая|ую) +страниц(а|у)))
    forward: "вперёд" //(впер(ё|е)д|(следующ(ая|ую) +страниц(а|у)))
}

const enRegExp = {
    reload: '(reload|refresh)',
    down: '(down|lower)',
    up: '(up|higher)',
    bottom: '(bottom)',
    top: '(^| )(top)($| )',
    more: '(^| )(more)($| )',
    click: '(((click|press)( on)?)).*(\\d)+',
    back: '(back|(previous +page))',
    forward: '(forward|(next +page))'
}

const ruRegExp = {
    reload: '(перезагрузи(ть)?|обнови(ть)?)',
    down: '(вниз|ниже)',
    up: '(вверх|выше)',
    bottom: '(кон(ец|цу))',
    top: '(начал(о|а|у))',
    more: '(ещ(ё|е))',
    click: '(((нажми)( на)?)|(откр(ой|ыть))).*(\\d)+',
    back: '(назад|(предыдущ(ая|ую) +страниц(а|у)))',
    forward: '(впер(ё|е)д|(следующ(ая|ую) +страниц(а|у)))'
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