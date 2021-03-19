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
    if (state.mode === 'command') {
        helper.innerText = message
        if (!timer) {
            let detected = commands(message)
            if (detected) {
                timer = setTimeout(() => {
                    clearInterval(timer)
                    timer = null
                    helper.innerText = ""
                }, 1500)
            }
        }
    } else {
        const { text, target } = message
        const inputs = document.querySelectorAll(`input[data-after='${target}']`)
        helper.innerText = text
        if (inputs.length > 0) {
            inputs[0].value = text
        }
        // if (!timer) {
        //     timer = setTimeout(() => {
        //         clearInterval(timer)
        //         timer = null
        //         helper.innerText = ""
        //     }, 4000)
        // } else {
        //     clearInterval(timer)
        //     timer = setTimeout(() => {
        //         clearInterval(timer)
        //         timer = null
        //         helper.innerText = ""
        //     }, 4000)
        // }
    }
})