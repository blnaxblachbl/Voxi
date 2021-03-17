export const commands = async (command) => {
    if (command.includes("tab")) {
        const current = await chrome.tabs.query({ active: true, currentWindow: true })
        const allTabs = await chrome.tabs.query({ groupId: current[0].groupId })
        const allTabsIds = allTabs.map(item => item.id)
        const currentTabIndex = allTabsIds.indexOf(current[0].id)
        if (command.includes('next')) {
            console.log("next")
            if (currentTabIndex !== -1) {
                if (currentTabIndex + 1 <= allTabsIds.length - 1) {
                    chrome.tabs.update(allTabsIds[currentTabIndex + 1], { selected: true })
                } else {
                    chrome.tabs.update(allTabsIds[0], { selected: true })
                }
            }
            return true
        }
        if (command.includes('prev')) {
            if (currentTabIndex !== -1) {
                if (currentTabIndex - 1 >= 0) {
                    chrome.tabs.update(allTabsIds[currentTabIndex - 1], { selected: true })
                } else {
                    chrome.tabs.update(allTabsIds[allTabsIds.length - 1], { selected: true })
                }
            }
            return true
        }
        if (command.includes('close')) {
            chrome.tabs.remove(current[0].id)
            return true
        }
        if (command.includes('new') || command.includes('create')) {
            chrome.tabs.create({
                active: true
            })
            return true
        }
    }
    if (command.includes('search') || command.includes('find')) {
        chrome.tabs.create({
            active: true,
            url: `https://www.google.com/search?q=${command.replace(/(search|find)/gm, '')}`
        })
        return true
    }
    const current = await chrome.tabs.query({ active: true, currentWindow: true })
    if (current.length > 0 && current[0].id) {
        chrome.tabs.sendMessage(current[0].id, command)
    }
    return false
}