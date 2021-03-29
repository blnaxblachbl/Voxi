import { commandsList } from './commands-list'

let timer

export const selects = (command) => {
    if (command.match(new RegExp(commandsList.select))) {
        chrome.storage.sync.get(['writeTarget', 'selectKey', 'language'], ({ writeTarget, selectKey, language }) => {
            clickOnSelect(selectKey, writeTarget, language)
            chrome.storage.sync.set({ mode: 'command', writeTarget: 0, selectKey: '' })
        })
        return true
    }
    if (command.match(new RegExp(commandsList.next))) {
        chrome.storage.sync.get(['selectKey', 'writeTarget', 'language'], ({ selectKey, writeTarget, language }) => {
            setSelect(selectKey, writeTarget + 1, language)
        })
        return true
    }
    if (command.match(new RegExp(commandsList.prev))) {
        chrome.storage.sync.get(['selectKey', 'writeTarget', 'language'], ({ selectKey, writeTarget, language }) => {
            setSelect(selectKey, writeTarget - 1, language)
        })
        return true
    }
    if (command.match(new RegExp(commandsList.cancel))) {
        chrome.storage.sync.get(['selectKey', 'writeTarget', 'language'], ({ selectKey, writeTarget, language }) => {
            blurTarget(selectKey, writeTarget, language)
        })
        return true
    }
    return false
}

const elemenst = [
    'button',
    'a',
    'input[type="text"]',
    'input[type="radio"]',
    'input[type="button"]',
    'input[type="file"]',
    'input[type="email"]',
    'input[type="password"]',
    'input[type="submit"]',
    'textarea'
]

export const searchElement = (command) => {
    chrome.storage.sync.get(['language'], ({ language }) => {
        const resArr = getElements(command, language)
        console.log(resArr)
        if (resArr.length > 0) {
            if (resArr.length === 1) {
                resArr[0].click()
            } else {
                resArr[0].focus()
                chrome.storage.sync.set({ mode: "select", selectKey: command }, () => {
                    stratTimer()
                })
            }
        }
    })
}

const getElements = (command, language) => {
    let text = command.replace(/(^ *| *$)/, "")
    const en = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const ru = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'
    let upper = language === 'ru-RU' ? ru : en
    let lower = upper.toLowerCase()
    let xpath = `html/body//*[contains(translate(normalize-space(text()), "${upper}", "${lower}"), '${text}') and not(@id="voxi-helper")]//ancestor-or-self::*[local-name()="a" or local-name()="button"]`;
    let matchingElement = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null)
    let resArr = []
    let res = matchingElement.iterateNext()
    while (res) {
        // if (res.parentNode instanceof )
        resArr.push(res)
        res = matchingElement.iterateNext()
    }
    return resArr
}

const clickOnSelect = (selectKey, writeTarget, language) => {
    const resArr = getElements(selectKey, language)
    resArr[writeTarget].blur()
    resArr[writeTarget].click()
    chrome.storage.sync.set({
        writeTarget: 0,
        mode: 'command',
        selectKey: ''
    })
    stopTimer()
}

const blurTarget = (selectKey, writeTarget, language) => {
    const resArr = getElements(selectKey, language)
    resArr[writeTarget].blur()
    chrome.storage.sync.set({
        writeTarget: 0,
        mode: 'command',
        selectKey: ''
    })
    stopTimer()
}

const setSelect = (selectKey, writeTarget, language) => {
    const resArr = getElements(selectKey, language)
    let newTarget = writeTarget
    if (writeTarget > resArr.length - 1) {
        newTarget = 0
    }
    if (writeTarget < 0) {
        newTarget = resArr.length - 1
    }
    resArr[newTarget].focus()
    chrome.storage.sync.set({ writeTarget: newTarget }, () => {
        stratTimer()
    })
}

const stratTimer = () => {
    console.log('timer started')
    if (timer) {
        stopTimer()
    }
    timer = setTimeout(() => {
        chrome.storage.sync.get(['selectKey', 'writeTarget', 'language'], ({ selectKey, writeTarget, language }) => {
            blurTarget(selectKey, writeTarget, language)
        })
    }, 15000)
}

const stopTimer = () => {
    if (timer) {
        clearInterval(timer)
        timer = null
    }
}