import { commands } from './commands'
import "./parser"
import "./helper"

let timer

let state = {
    mode: "command",
    lascommand: "down",
    writeTarget: 0,
    started: false,
}

let helper = document.getElementById("voxi-helper")

chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let key in changes) {
        let storageChange = changes[key]
        state[key] = storageChange.newValue
    }
})

chrome.runtime.onMessage.addListener((message, sender, responder) => {
    if (message) {
        const { text, target, command } = message
        console.log("text", text)
        console.log("command", command)
        helper.innerText = text
        if (state.mode === 'command') {
            commands(command)
        } else {
            const inputs = document.querySelectorAll(`input[data-after='${target}']`)
            if (inputs.length > 0 && text) {
                inputs[0].value = text 
            }
            if (timer) {
                clearInterval(timer)
            }
            timer = setTimeout(() => {
                clearInterval(timer)
                timer = null
            }, 4000)
        }
    }
})