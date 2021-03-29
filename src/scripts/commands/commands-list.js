const enRegExp = {
    reload: '((^reload|^refresh)( +page)?$)',
    down: '(^(scroll(ing)? +)?(down$|lower$))',
    up: '(^(scroll(ing)? +)?(up$|higher$))',
    bottom: '(bottom)',
    top: '(^top$)',
    more: '(^more$)',
    click: '(((click|press)( on)?)).*(\\d)+',
    back: '(back|(previous +page))',
    forward: '(forward|(next +page))',
    next: '(next( +select)?)',
    prev: '(previous( +select)?)',
    select: '(select|pick|press|click)',
    cancel: '(cancel( +select)?)',
}

const ruRegExp = {
    reload: '(перезагрузи(ть)?|обнови(ть)?)( страницу)?',
    down: '^(вниз|ниже)$',
    up: '^(вверх|выше)$',
    bottom: '^((к|в +)?кон(ец|цу))$',
    top: '(начал(о|а|у))',
    more: '^(ещ(ё|е)$)',
    click: '(((нажми)( на)?)|(откр(ой|ыть))).*(\\d)+',
    back: '(назад|(предыдущ(ая|ую) +страниц(а|у)))',
    forward: '(впер(ё|е)д|(следующ(ая|ую) +страниц(а|у)))',
    next: '(дальше|далее|вп(е|ё)рд)',
    prev: '(назад|верн(ись|и|уть|уться))',
    select: '(выб(рать|ери)|наж(ать|ми))( +выделени(е|я))?',
    cancel: '(отмен(ить|на|и)( +выделение)?)',
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