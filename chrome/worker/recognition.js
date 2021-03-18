window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
window.SpeechGrammarList = window.webkitSpeechGrammarList || window.SpeechGrammarList

let state = {
    mode: "command",
    lascommand: "down",
    writeTarget: 0,
    started: false,
}
let timer

let grammar = '#JSGF V1.0; grammar commands; public <command> = click | tab | prev | next | previous | close | up | lower | higher | forward | back | search | more | find ;'
let speechRecognitionList = new SpeechGrammarList()
speechRecognitionList.addFromString(grammar, 1)

let recognition = new SpeechRecognition()
recognition.grammars = speechRecognitionList
recognition.continuous = true
recognition.interimResults = true
recognition.maxAlternatives = 1

chrome.storage.sync.get(['language', 'autorun'], ({ language, autorun }) => {
    recognition.lang = language
    if (autorun) {
        recognition.start()
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
            console.log(storageChange.newValue)
        }
        if (key === 'autorun') {
            if (storageChange.newValue) {
                setTimeout(() => {
                    recognition.start()
                    state.started = true
                }, 500)
            } else {
                recognition.stop()
                state.started = false
            }
        }
    }
})

recognition.onresult = (event) => {
    const { results } = event
    const text = results[results.length - 1][0].transcript
    console.log("text", text.toLowerCase())
    if (state.mode === 'command') {
        chrome.runtime.sendMessage(text.toLowerCase())
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

const clearTimer = () => {
    clearInterval(timer)
    timer = null
}

const startTimer = () => {
    timer = setTimeout(() => {
        chrome.storage.sync.set({ mode: "command" })
        chrome.storage.sync.set({ writeTarget: 0 })
        clearTimer()
    }, 5000)
}

recognition.onerror = async (e) => {
    console.log("error", e)
    if (!state.started) {
        recognition.stop()
        setTimeout(() => {
            recognition.start()
            state.started = true
        }, 500)
    } else {
        recognition.start()
    }
}

// window.addEventListener('load', () => recognition.start())