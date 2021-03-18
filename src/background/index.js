import { commands } from './commands'

let timer

chrome.runtime.onInstalled.addListener(() => {
    console.log("installed:)")

    chrome.storage.sync.set({ lascommand: "down" })
    chrome.storage.sync.set({ mode: "command" })
    chrome.storage.sync.set({ writeTarget: 0 })
    chrome.storage.sync.set({ autorun: true })
    chrome.storage.sync.set({ language: 'en-US' })
})

chrome.windows.onCreated.addListener(() => {
    chrome.storage.sync.get(['autorun'], ({ autorun }) => {
        if (autorun) {
            chrome.tabs.create({
                active: false,
                index: 0,
                pinned: true,
                url: 'worker/worker.html'
            })
        }
    })
})

chrome.storage.onChanged.addListener(async (changes, namespace) => {
    for (let key in changes) {
        let storageChange = changes[key]
        if (key === 'autorun' && storageChange.newValue) {
            const voxiTab = await chrome.tabs.query({
                url: 'chrome-extension://aneandehgfkgcaodckhobnmencgjbclm/worker/worker.html'
            })
            if (voxiTab.length === 0) {
                chrome.tabs.create({
                    active: true,
                    index: 0,
                    pinned: true,
                    url: 'worker/worker.html'
                })
            } else {
                chrome.tabs.update(voxiTab[0].id, { active: true })
            }
        }
        if (key === 'autorun' && !storageChange.newValue) {
            const voxiTab = await chrome.tabs.query({
                active: false,
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