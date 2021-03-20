import { commands } from './commands'

let timer

chrome.runtime.onInstalled.addListener(() => {
    console.log("installed:)")

    chrome.storage.sync.set({
        lascommand: "down",
        mode: "command",
        writeTarget: 0,
        autorun: true,
        started: true,
        language: 'en-US'
    })
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
            if (storageChange.newValue) {
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
                } else if (voxiTab[0].id) {
                    chrome.tabs.update(voxiTab[0].id, { active: true })
                }
            } else {
                const voxiTab = await chrome.tabs.query({
                    active: false,
                    index: 0,
                    pinned: true,
                    url: 'chrome-extension://aneandehgfkgcaodckhobnmencgjbclm/worker/worker.html'
                })
                if (voxiTab[0].id) {
                    chrome.tabs.remove(voxiTab[0].id)
                }
            }
        }
    }
})


chrome.runtime.onMessage.addListener((message) => {
    // console.log(message)
    const { command } = message
    commands(command)
    // if (timer) {
    //     clearInterval(timer)
    // }
    // timer = setTimeout(() => {
    //     commands(message)
    //     clearInterval(timer)
    //     timer = null
    // }, 1500)
    // if (!timer) {
    //     const detected = commands(message)
    //     if (detected) {
    //         timer = setTimeout(() => {
    //             clearInterval(timer)
    //             timer = null
    //         }, 1500)
    //     }
    // }
})