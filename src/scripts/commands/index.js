import { commandsList } from './commands-list'

export const commands = (command) => {
    if (command.includes(commandsList.reload)) {
        window.location.reload()
        return true
    }
    if (command.includes(commandsList.down) || command.includes(commandsList.lower)) {
        scrollDown()
        chrome.storage.sync.set({ lascommand: "down" })
        return true
    }
    if (command.includes(commandsList.up) || command.includes(commandsList.higher)) {
        scrollUp()
        chrome.storage.sync.set({ lascommand: "up" })
        return true
    }
    if (command.includes(commandsList.bottom)) {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
        chrome.storage.sync.set({ lascommand: "down" })
        return true
    }
    if (command.includes(commandsList.top)) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        chrome.storage.sync.set({ lascommand: "up" })
        return true
    }
    if (command.includes(commandsList.more)) {
        chrome.storage.sync.get(["lascommand"], ({ lascommand }) => {
            if (lascommand === 'down') {
                scrollDown()
            }
            if (lascommand === 'up') {
                scrollUp()
            }
        })
        return true
    }
    if (command.includes(commandsList.click)) {
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
        if (element.length > 0) {
            if (element[0] instanceof HTMLInputElement || element[0] instanceof HTMLTextAreaElement) {
                setTimeout(() => {
                    chrome.storage.sync.set({ mode: "write" })
                    chrome.storage.sync.set({ writeTarget: number })
                }, 1000)
            }
            element[0].click()
        }
        return true
    }
    if (command.includes(commandsList.back)) {
        window.history.back()
        return true
    }
    if (command.includes(commandsList.forward)) {
        window.history.forward()
        return true
    }
    return false
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