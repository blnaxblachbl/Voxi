import { commands } from './commands'

let timer

chrome.runtime.onInstalled.addListener(() => {
    console.log("installed:)")

    chrome.storage.sync.set({ lascommand: "down" })
    chrome.storage.sync.set({ mode: "command" })
    chrome.storage.sync.set({ writeTarget: 0 })
    chrome.storage.sync.set({ autorun: false })
})

chrome.storage.onChanged.addListener(async (changes, namespace) => {
    for (let key in changes) {
        let storageChange = changes[key]
        if (key === 'autorun' && storageChange.newValue) {
            chrome.tabs.create({
                active: true,
                index: 0,
                pinned: true,
                url: 'worker/worker.html'
            })
        }
        if (key === 'autorun' && !storageChange.newValue) {
            const voxiTab = await chrome.tabs.query({
                active: true,
                index: 0,
                pinned: true,
                url: 'chrome-extension://aneandehgfkgcaodckhobnmencgjbclm/worker/worker.html'
            })
            chrome.tabs.remove(voxiTab[0].id)
        }
    }
})


chrome.runtime.onMessage.addListener((message) => {
    if (!timer) {
        const detected = commands(message)
        if (detected) {
            timer = setTimeout(() => {
                clearInterval(timer)
                timer = null
            }, 1500)
        }
    }
})