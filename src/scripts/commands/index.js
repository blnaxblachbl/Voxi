import { commandsList } from './commands-list'
import { searchElement } from './select'

export const commands = (command) => {
    if (command.match(new RegExp(commandsList.reload, 'gm'))) {
        window.location.reload()
        chrome.storage.sync.set({ lascommand: command })
        return true
    }
    if (command.match(new RegExp(commandsList.down), 'gm')) {
        scrollDown()
        chrome.storage.sync.set({ lascommand: command })
        return true
    }
    if (command.match(new RegExp(commandsList.up, 'gm'))) {
        scrollUp()
        chrome.storage.sync.set({ lascommand: command })
        return true
    }
    if (command.match(new RegExp(commandsList.bottom, 'gm'))) {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
        chrome.storage.sync.set({ lascommand: command })
        return true
    }
    if (command.match(new RegExp(commandsList.top, 'gm'))) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        chrome.storage.sync.set({ lascommand: command })
        return true
    }
    if (command.match(new RegExp(commandsList.more, 'gm'))) {
        chrome.storage.sync.get(["lascommand"], ({ lascommand }) => {
            commands(lascommand)
        })
        return true
    }
    if (command.match(new RegExp(commandsList.click))) {
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
        const element = document.querySelectorAll(`[data-after="${number}"]`)
        if (element.length > 0) {
            console.log(element[0])
            if (element[0] instanceof HTMLInputElement || element[0] instanceof HTMLTextAreaElement) {
                setTimeout(() => {
                    chrome.storage.sync.set({ mode: "write", writeTarget: number })
                    element[0].focus()
                }, 1000)
            } else {
                element[0].focus()
                element[0].click()
            }
        }
        chrome.storage.sync.set({ lascommand: command })
        return true
    }
    if (command.match(new RegExp(commandsList.back, 'gm'))) {
        window.history.back()
        chrome.storage.sync.set({ lascommand: command })
        return true
    }
    if (command.match(new RegExp(commandsList.forward, 'gm'))) {
        window.history.forward()
        chrome.storage.sync.set({ lascommand: command })
        return true
    }
    searchElement(command)
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