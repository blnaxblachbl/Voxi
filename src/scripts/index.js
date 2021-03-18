import { commands } from './commands'
import "./parser"

let timer

let state = {
    mode: "command",
    lascommand: "down",
    writeTarget: 0,
    started: false,
}

chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let key in changes) {
        let storageChange = changes[key]
        state[key] = storageChange.newValue
    }
})

chrome.runtime.onMessage.addListener((message, sender, responder) => {
    if (state.mode === 'command') {
        if (!timer) {
            let detected = commands(message)
            if (detected) {
                timer = setTimeout(() => {
                    clearInterval(timer)
                    timer = null
                }, 1500)
            }
        }
    } else {
        const { text, target } = message
        const inputs = document.querySelectorAll(`input[data-after='${target}']`)
        if (inputs.length > 0) {
            inputs[0].value = text
        }
    }
})