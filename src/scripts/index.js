import { recognition } from './recognition'
import { commands } from './commands'
import "./parser"

let state = {
    lascommand: "down",
    mode: "command",
    writeTarget: 0,
    started: false,
}

let timer

chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let key in changes) {
        let storageChange = changes[key]
        state[key] = storageChange.newValue
        if (key === 'mode') {
            recognition.interimResults = storageChange.newValue
        }
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
            console.log("text", text)
            inputs[0].value = text
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

recognition.onerror = (e) => {
    console.log("error", e)
    if (!state.started) {
        stopListening()
        startListening()
    } else {
        startListening()
    }
}

const startListening = () => {
    if (!state.started) {
        console.log("start listening")
        recognition.start()
        state.started = true
    }
}

const stopListening = () => {
    if (state.started) {
        console.log("stop listening")
        recognition.stop()
        state.started = false
    }
}

window.addEventListener('blur', stopListening)
window.addEventListener('focus', startListening)
window.addEventListener('load', startListening)