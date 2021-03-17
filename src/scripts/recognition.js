import { commands, writeToInput } from './commands'

window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
window.SpeechGrammarList = window.webkitSpeechGrammarList || window.SpeechGrammarList

let state = {
    mode: "command",
    lascommand: "down",
    writeTarget: 0,
    started: false,
}
let timer

var grammar = '#JSGF V1.0; grammar commands; public <command> = click | tab | prev | next | tab | previous | close | up | lower | higher | forward | back | search | more ;'
var speechRecognitionList = new SpeechGrammarList()
speechRecognitionList.addFromString(grammar, 1)

let recognition = new SpeechRecognition()
recognition.grammars = speechRecognitionList
recognition.continuous = true
recognition.lang = 'en-US'
recognition.interimResults = true
recognition.maxAlternatives = 1

chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let key in changes) {
        let storageChange = changes[key]
        state[key] = storageChange.newValue
    }
})

recognition.onresult = (event) => {
    const { results } = event
    const text = results[results.length - 1][0].transcript
    if (state.mode === 'command') {
        commands(text)
    }
    if (state.mode === 'write') {
        const inputs = document.querySelectorAll(`input[data-after='${state.writeTarget}']`)
        if (inputs.length > 0) {
            inputs[0].value += text
            if (timer) {
                clearTimer()
                startTimer()
            } else {
                startTimer()
            }
        }
    }
}

const startTimer = () => {
    timer = setTimeout(() => {
        chrome.storage.sync.set({ mode: "command" })
        chrome.storage.sync.set({ writeTarget: 0 })
        console.log("stoped")
        clearTimer()
    }, 3000)
}

const clearTimer = () => {
    clearInterval(timer)
    timer = null
}

export {
    recognition,
    state
}