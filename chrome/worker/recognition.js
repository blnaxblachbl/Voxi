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
        if (key === 'mode') {
            sendCommandToTab('')
        }
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
    const { results } = event
    let text = ''
    for (let i = event.resultIndex; i < results.length; i++) {
        text += results[i][0].transcript
    }
    if (state.mode === 'command') {
        chrome.runtime.sendMessage(text.toLowerCase())
        sendCommandToTab(text.toLowerCase())
    }
    if (state.mode === 'write') {
        sendTextToTab(text)
        if (timer) {
            clearTimer()
            startTimer()
        } else {
            startTimer()
        }
    }
}

const sendTextToTab = async (text) => {
    const current = await chrome.tabs.query({ active: true, currentWindow: true })
    chrome.tabs.sendMessage(current[0].id, { text: text.toLowerCase(), target: state.writeTarget })
}

const sendCommandToTab = async text => {
    const current = await chrome.tabs.query({ active: true, currentWindow: true })
    chrome.tabs.sendMessage(current[0].id, text)
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

recognition.onerror = async (e) => {
    console.error(e)
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