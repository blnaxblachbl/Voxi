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

chrome.storage.sync.get(['language', 'started'], ({ language, started }) => {
    recognition.lang = language
    recognition.start()
    state.started = true
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
    // text = isFinal ? '' : text
    if (state.mode === 'command') {
        chrome.runtime.sendMessage({ command })
        sendToTab({ text, command })
    }
    if (helper) {
        if (isFinal) {
            helper.innerText = ''
            setTimeout(() => {
                sendToTab({ text: '' })
            }, 200)
        } else {
            helper.innerText = text
        }
    }
    if (state.mode === 'write') {
        if (isFinal) {
            chrome.storage.sync.set({ mode: "command", writeTarget: 0 })
            // chrome.storage.sync.set({ writeTarget: 0 })
        }
        sendToTab({ text })
    }
    if (state.mode === 'select') {
        sendToTab({ text, command })
    }
}

const sendToTab = async ({ text = '', command = '', isFinal = false }) => {
    const current = await chrome.tabs.query({ active: true, currentWindow: true })
    chrome.tabs.sendMessage(current[0].id, { text, command })
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