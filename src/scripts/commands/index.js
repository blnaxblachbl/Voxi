export const commands = (command) => {
    console.log("command", command)
    command.toLowerCase()
    if (command.includes('reload')) {
        window.location.reload()
    }
    if (command.includes("down") || command.includes("lower")) {
        scrollDown()
        chrome.storage.sync.set({ lascommand: "down" })
    }
    if (command.includes("up") || command.includes("higher")) {
        scrollUp()
        chrome.storage.sync.set({ lascommand: "up" })
    }
    if (command.includes('bottom')) {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'auto' })
        chrome.storage.sync.set({ lascommand: "down" })
    }
    if (command.includes('top')) {
        window.scrollTo({ top: 0, behavior: 'auto' })
        chrome.storage.sync.set({ lascommand: "up" })
    }
    if (command.includes("more")) {
        chrome.storage.sync.get(["lascommand"], ({ lascommand }) => {
            if (lascommand === 'down') {
                scrollDown()
            }
            if (lascommand === 'up') {
                scrollUp()
            }
        })
    }
    if (command.includes('click')) {
        const digit = command.replace(/zero/, 0)
            .replace(/one/, 1)
            .replace(/two/, 2)
            .replace(/three/, 3)
            .replace(/four/, 4)
            .replace(/five/, 5)
            .replace(/six/, 6)
            .replace(/seven/, 7)
            .replace(/eight/, 8)
            .replace(/nine/, 9)
        const number = digit.replace(/\D/gm, '')
        const element = document.querySelectorAll(`[data-after='${number}']`)
        console.log(element)
        if (element.length > 0) {
            if (element[0] instanceof HTMLInputElement) {
                setTimeout(() => {
                    chrome.storage.sync.set({ mode: "write" })
                    chrome.storage.sync.set({ writeTarget: number })
                }, 1000)
            }
            element[0].click()
        }
    }
    if (command.includes("back")) {
        window.history.back()
    }
    if (command.includes("forward")) {
        window.history.forward()
    }
    if (command.includes("tab")) {
        chrome.runtime.sendMessage(command)
    }
    if (command.includes('search')) {
        // chrome.search.query({
        //     text: command.replace(/search/gm, ''),
        //     description: "NEW_TAB",
        // })
    }
}

const scrollDown = () => {
    let duration = 0
    let scrollDownInterval = setInterval(() => {
        if (duration < 500) {
            window.scrollBy(0, 10)
            duration = duration + 10
        } else {
            clearInterval(scrollDownInterval)
        }
    }, 10);
}

const scrollUp = () => {
    let duration = 0
    let scrollUpInterval = setInterval(() => {
        if (duration < 500) {
            window.scrollBy(0, -10)
            duration = duration + 10
        } else {
            clearInterval(scrollUpInterval)
        }
    }, 10);
}