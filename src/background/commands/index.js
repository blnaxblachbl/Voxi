import { commandsList } from './commands-list'

export const commands = async (command) => {
    const current = await chrome.tabs.query({ active: true, currentWindow: true })
    if (current.length > 0 && current[0].id && current[0].groupId) {
        const allTabs = await chrome.tabs.query({ groupId: current[0].groupId })
        const allTabsIds = allTabs.map(item => item.id)
        const currentTabIndex = allTabsIds.indexOf(current[0].id)
        if (command.match(new RegExp(commandsList.next, 'g'))) {
            if (currentTabIndex !== -1) {
                if (currentTabIndex + 1 <= allTabsIds.length - 1) {
                    chrome.tabs.update(allTabsIds[currentTabIndex + 1], { selected: true })
                } else {
                    chrome.tabs.update(allTabsIds[0], { selected: true })
                }
            }
            chrome.storage.sync.set({ lascommand: command })
            return true
        }
        if (command.match(new RegExp(commandsList.prev, 'g'))) {
            if (currentTabIndex !== -1) {
                if (currentTabIndex - 1 >= 0) {
                    chrome.tabs.update(allTabsIds[currentTabIndex - 1], { selected: true })
                } else {
                    chrome.tabs.update(allTabsIds[allTabsIds.length - 1], { selected: true })
                }
            }
            chrome.storage.sync.set({ lascommand: command })
            return true
        }
        if (command.match(new RegExp(commandsList.close, 'g'))) {
            chrome.tabs.remove(current[0].id)
            chrome.storage.sync.set({ lascommand: command })
            return true
        }
        if (command.match(new RegExp(commandsList.new, 'g'))) {
            chrome.tabs.create({
                active: true
            })
            chrome.storage.sync.set({ lascommand: command })
            return true
        }
        if (command.match(new RegExp(commandsList.search, 'g'))) {
            chrome.tabs.create({
                active: true,
                url: `https://www.google.com/search?q=${command.replace(new RegExp(commandsList.search, 'g'), '')}`
            })
            chrome.storage.sync.set({ lascommand: command })
            return true
        }
        if (command.match(new RegExp(commandsList.chnageLanguage, 'g'))) {
            if (command.match(/(russian|русский)/g)) {
                chrome.storage.sync.set({ language: 'ru-RU' })
            }
            if (command.match(/(english|английский)/g)) {
                chrome.storage.sync.set({ language: 'en-US' })
            }
            chrome.storage.sync.set({ lascommand: command })
            return true
        }
        if (command.match(new RegExp(commandsList.more, 'gm'))) {
            chrome.storage.sync.get(["lascommand"], ({ lascommand }) => {
                commands(lascommand)
            })
            return true
        }
    }
    return false
}