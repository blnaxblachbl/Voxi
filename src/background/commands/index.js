import { commandsList } from './commands-list'
export const commands = async (command) => {
    const current = await chrome.tabs.query({ active: true, currentWindow: true })
    if (current.length > 0 && current[0].id && current[0].groupId) {
        const allTabs = await chrome.tabs.query({ groupId: current[0].groupId })
        const allTabsIds = allTabs.map(item => item.id)
        const currentTabIndex = allTabsIds.indexOf(current[0].id)
        if (command.includes(commandsList.next)) {
            if (currentTabIndex !== -1) {
                if (currentTabIndex + 1 <= allTabsIds.length - 1) {
                    chrome.tabs.update(allTabsIds[currentTabIndex + 1], { selected: true })
                } else {
                    chrome.tabs.update(allTabsIds[0], { selected: true })
                }
            }
            return true
        }
        if (command.includes(commandsList.prev)) {
            if (currentTabIndex !== -1) {
                if (currentTabIndex - 1 >= 0) {
                    chrome.tabs.update(allTabsIds[currentTabIndex - 1], { selected: true })
                } else {
                    chrome.tabs.update(allTabsIds[allTabsIds.length - 1], { selected: true })
                }
            }
            return true
        }
        if (command.includes(commandsList.close)) {
            chrome.tabs.remove(current[0].id)
            return true
        }
        if (command.includes(commandsList.new) || command.includes(commandsList.create)) {
            chrome.tabs.create({
                active: true
            })
            return true
        }
        if (command.includes(commandsList.search) || command.includes(commandsList.find)) {
            chrome.tabs.create({
                active: true,
                url: `https://www.google.com/search?q=${command.replace(/(search|find|найди|поиск)/gm, '')}`
            })
            return true
        }
    }
    return false
}