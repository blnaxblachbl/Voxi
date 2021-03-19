window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
window.SpeechGrammarList = window.webkitSpeechGrammarList || window.SpeechGrammarList

let state = {
    mode: "command",
    lascommand: "down",
    writeTarget: 0,
    started: false,
}

let timer

const grammarEn = '#JSGF V1.0; grammar commands; public <command> = click | tab | prev | next | previous | close | up | lower | higher | forward | back | search | more | find ;'
const grammarRu = '#JSGF V1.0; grammar commands; public <command> = click | таб | пед | следующий | педыдущий | закрыть | вверх | ниже | выше | вперёд | назад | поиск | ещё | найди ;'
const speechRecognitionList = new SpeechGrammarList()
speechRecognitionList.addFromString(grammarRu, 1)
speechRecognitionList.addFromString(grammarEn, 1)

const recognition = new SpeechRecognition()
recognition.grammars = speechRecognitionList
recognition.continuous = true
recognition.interimResults = true
recognition.maxAlternatives = 1

chrome.storage.sync.get(['language', 'autorun'], ({ language, autorun }) => {
    recognition.lang = language
    if (autorun) {
        recognition.start()
        state.started = true
    }
})

chrome.storage.onChanged.addListener(async (changes, namespace) => {
    for (let key in changes) {
        let storageChange = changes[key]
        state[key] = storageChange.newValue
        if (key === 'language') {
            recognition.lang = storageChange.newValue
            recognition.stop()
            state.started = false
            setTimeout(() => {
                recognition.start()
                state.started = true
            }, 500)
        }
    }
})

recognition.onresult = (event) => {
    helper = document.getElementById("voxi-helper")
    const { results, resultIndex } = event
    let text = ''
    let command = ''
    let isFinal = results[resultIndex].isFinal
    for (let i = resultIndex; i < results.length; i++) {
        text += results[i][0].transcript.toLowerCase()
    }
    command = isFinal ? text : ''
    text = isFinal ? '' : text
    if (helper) {
        if (isFinal) {
            helper.innerText = ''
        } else {
            helper.innerText = text
        }
    }
    if (state.mode === 'command') {
        chrome.runtime.sendMessage({ command })
        sendToTab({ text, command })
    }
    if (state.mode === 'write') {
        sendToTab({ text, target: state.writeTarget })
        if (timer) {
            clearTimer()
        }
        startTimer()
    }
}

const sendToTab = async ({ text = '', command = '', target = 0 }) => {
    const current = await chrome.tabs.query({ active: true, currentWindow: true })
    chrome.tabs.sendMessage(current[0].id, { text, command, target })
}

const clearTimer = () => {
    clearInterval(timer)
    timer = null
}

const startTimer = () => {
    timer = setTimeout(() => {
        chrome.storage.sync.set({ mode: "command" })
        chrome.storage.sync.set({ writeTarget: 0 })
        clearTimer()
    }, 4000)
}

recognition.onerror = (e) => {
    console.log(e)
    if (state.started) {
        recognition.stop()
        setTimeout(() => {
            recognition.start()
            state.started = true
        }, 500)
    } else {
        recognition.start()
        state.started = true
    }
}
document.addEventListener("DOMContentLoaded", (event) => {
    const switchElement = document.getElementById("switchElement")
    switchElement.addEventListener('change', (e) => {
        if (e.target.checked) {
            setTimeout(() => {
                recognition.start()
                state.started = true
            }, 500)
        } else {
            recognition.stop()
            state.started = false
        }
    })
})

// window.addEventListener('load', () => recognition.start())