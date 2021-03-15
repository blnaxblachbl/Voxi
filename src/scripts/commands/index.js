import commandsList from './commands-list'

export const commands = (command) => {
    console.log("command", command)
    if (command.includes("down") || command.includes("lower")) {
        scrollDown()
        lascommand = "down"
    }
    if (command.includes("up") || command.includes("higher")) {
        scrollUp()
        lascommand = "up"
    }
    if (command.includes('bottom')) {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'auto' })
        lascommand = "down"
    }
    if (command.includes('top')) {
        window.scrollTo({ top: 0, behavior: 'auto' })
        lascommand = "up"
    }
    if (command.includes("more")) {
        if (lascommand === 'down') {
            scrollDown()
        }
        if (lascommand === 'up') {
            scrollUp()
        }
    }
    if (command.includes('button')) {
        const digit = command.replace(/(^(zero) ?| (zero) ?)/, 0).replace(/(^(one) ?| (one) ?)/, 1).replace(/(^(two) ?| (two) ?)/, 2).replace(/(^(three) ?| (three) ?)/, 3).replace(/(^(four) ?| (four) ?)/, 4).replace(/(^(five) ?| (five) ?)/, 5).replace(/(^(six) ?| (six) ?)/, 6).replace(/(^(seven) ?| (seven) ?)/, 7).replace(/(^(eight) ?| (eight) ?)/, 8).replace(/(^(nine) ?| (nine) ?)/, 8)
        const number = digit.replace(/\D/gm, '')
        const button = document.querySelectorAll(`button[data-after='${number}']`)
        // const button = document.querySelectorAll(`button[data-after='${number}'], input[data-after='${number}']`)
        console.log(button)
        if (button.length > 0) {
            button[0].click()
        }
    }
    if (command.includes('link')) {
        const digit = command.replace(/(^(zero) ?| (zero) ?)/, 0).replace(/(^(one) ?| (one) ?)/, 1).replace(/(^(two) ?| (two) ?)/, 2).replace(/(^(three) ?| (three) ?)/, 3).replace(/(^(four) ?| (four) ?)/, 4).replace(/(^(five) ?| (five) ?)/, 5).replace(/(^(six) ?| (six) ?)/, 6).replace(/(^(seven) ?| (seven) ?)/, 7).replace(/(^(eight) ?| (eight) ?)/, 8).replace(/(^(nine) ?| (nine) ?)/, 8)
        const number = digit.replace(/\D/gm, '')
        const link = document.querySelectorAll(`a[data-after='${number}']`)
        console.log(link)
        if (link.length > 0) {
            link[0].click()
        }
    }
    if (command.includes("back")) {
        window.history.back()
    }
    if (command.includes("forward")) {
        window.history.forward()
    }
    if (command.includes("next")) {
        chrome.runtime.sendMessage("", "tab-next")
    }
    if (command.includes("prev")) {
        chrome.runtime.sendMessage("", "tab-prev")
    }
    if (command.includes("input")) {
        const digit = command.replace(/(^(zero) ?| (zero) ?)/, 0).replace(/(^(one) ?| (one) ?)/, 1).replace(/(^(two) ?| (two) ?)/, 2).replace(/(^(three) ?| (three) ?)/, 3).replace(/(^(four) ?| (four) ?)/, 4).replace(/(^(five) ?| (five) ?)/, 5).replace(/(^(six) ?| (six) ?)/, 6).replace(/(^(seven) ?| (seven) ?)/, 7).replace(/(^(eight) ?| (eight) ?)/, 8).replace(/(^(nine) ?| (nine) ?)/, 8)
        const number = digit.replace(/\D/gm, '')
        const inputs = document.querySelectorAll(`input[data-after='${number}']`)
        if (inputs.length > 0) {
            setTimeout(() => {
                mode = 'write'
                writeTarget = number
            }, 1000)
        }
    }
}