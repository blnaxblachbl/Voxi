import { commands } from './commands'
import "./parser"
import "./helper"

let state = {
    mode: "command",
    writeTarget: 0,
}

chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let key in changes) {
        let storageChange = changes[key]
        if (key === 'writeTarget' && storageChange.newValue === 0) {
            const inputs = document.querySelectorAll(`[data-after='${storageChange.oldValue}']`)
            if (inputs.length > 0) {
                inputs[0].blur()
            }
        }
        state[key] = storageChange.newValue
    }
})

chrome.runtime.onMessage.addListener((message, sender, responder) => {
    if (message) {
        const helper = document.getElementById("voxi-helper")
        const { text, command } = message
        helper.innerText = text
        if (state.mode === 'command') {
            const detected = commands(command)
            // const root = document.querySelectorAll('button, a, input[type="text"], input[type="select"], input[type="radio"], input[type="button"]')
            // console.log(command.replace(/[(^ )($ )]/, ''), detected)
            // if (command && !detected) {
            //     const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
            //     // console.log(treeWalker.nextNode())
            //     while (treeWalker.nextNode()) {
            //         const node = treeWalker.currentNode
            //         if (node.nodeType === Node.TEXT_NODE && node.textContent.toLowerCase().includes(command.replace(/[(^ )($ )]/gm, ''))) {
            //             console.log(node.parentNode)
            //             node.parentNode.click()
            //             break
            //         }
            //     }
            // }
        } else {
            const inputs = document.querySelectorAll(`[data-after='${state.writeTarget}']`)
            if (inputs.length > 0 && text) {
                inputs[0].value = text
            }
        }
    }
})