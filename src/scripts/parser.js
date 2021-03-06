chrome.storage.sync.get(['autorun'], ({ autorun }) => {
    if (autorun) {
        markElements()
    }
})

chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let key in changes) {
        let storageChange = changes[key]
        if (key === 'autorun') {
            if (storageChange.newValue) {
                markElements()
            } else {
                unmarkElements()
            }
        }
    }
})

const elemenst = [
    'button',
    'a',
    'input[type="text"]',
    'input[type="radio"]',
    'input[type="button"]',
    'input[type="file"]',
    'input[type="email"]',
    'input[type="password"]',
    'input[type="submit"]',
    'textarea'
]

const unmarkElements = () => {
    const arr = document.querySelectorAll(elemenst.join(', '))
    for (let i = 0, l = arr.length; i < l; i++) {
        arr[i].parentNode.classList.remove('voxi-parent')
        const number = document.querySelector(`[number-after="${arr[i].getAttribute("data-after")}"]`)
        if (number) {
            number.parentNode.removeChild(number)
            arr[i].removeAttribute('data-after')
        }
    }
}

const getOffset = (el) => {
    const rect = el.getBoundingClientRect()
    return rect
}

const markElements = async () => {
    const arr = document.querySelectorAll(elemenst.join(', '))
    const promices = []
    for (let i = 0, l = arr.length; i < l; i++) {
        if (arr[i] instanceof Node) {
            if (!arr[i].innerText) {
                promices.push(
                    new Promise((resolve, reject) => {
                        arr[i].setAttribute("data-after", i + 1)
                        // const { top } = getOffset(arr[i])
                        const parent = arr[i].parentNode
                        const parentOffset = getOffset(parent)
                        const childOffset = getOffset(arr[i])
                        // const parent = document.createElement('div')
                        const number = document.createElement('span')
                        number.setAttribute("number-after", i + 1)
                        number.innerText = i + 1
                        number.classList.add('voxi-after')
                        parent.classList.add('voxi-parent')
                        // const { width } = getOffset(number)
                        number.style = `right: ${parentOffset.right - childOffset.right}px; top: ${childOffset.top - parentOffset.top}px;`
                        parent.appendChild(number)
                        resolve(true)
                        // if (
                        //     (
                        //         arr[i] instanceof HTMLInputElement &&
                        //         (
                        //             arr[i].getAttribute('type') === 'email' ||
                        //             arr[i].getAttribute('type') === 'text'
                        //         )
                        //     ) ||
                        //     arr[i] instanceof HTMLTextAreaElement
                        // ) {
                        //     parent.classList.add('voxi-parent')
                        // } else {
                        //     parent.classList.add('voxi-parent')
                        //     // parent.classList.add('voxi-fit')
                        //     // arr[i].classList.forEach(item => {
                        //     //     parent.classList.add(item)
                        //     // })
                        // }
                        // const clone = arr[i].cloneNode(true)
                        // parent.appendChild(clone)
                        // setTimeout(() => {
                        //     arr[i].replaceWith(parent)
                        // }, 1500)
                    })
                )
            }
        }
    }
    await Promise.all(promices)
    document.addEventListener("DOMNodeInserted", async (event) => {
        await markMoreElements(event.relatedNode)
    })
}

const markMoreElements = async (node) => {
    const arr = node.querySelectorAll(elemenst.join(', '))
    const promices = []
    if (arr.length > 0) {
        const markedNodes = document.querySelectorAll('[data-after]')
        let count = markedNodes.length
        for (let i = 0, l = arr.length; i < l; i++) {
            if (arr[i] instanceof Node) {
                if (!arr[i].innerText) {
                    promices.push(
                        new Promise((resolve, reject) => {
                            count++
                            let exist = document.querySelector(`[data-after="${count}"]`)
                            if (!arr[i].getAttribute("data-after")) {
                                while (exist) {
                                    count++
                                    exist = document.querySelector(`[data-after="${count}"]`)
                                }
                                arr[i].setAttribute("data-after", count)
                                // const parent = document.createElement('div')
                                const parent = arr[i].parentNode
                                const parentOffset = getOffset(parent)
                                const childOffset = getOffset(arr[i])
                                const number = document.createElement('span')
                                number.setAttribute("number-after", count)
                                number.innerText = count
                                number.classList.add('voxi-after')
                                parent.classList.add('voxi-parent')
                                number.style = `right: ${parentOffset.right - childOffset.right}px; top: ${childOffset.top - parentOffset.top}px;`
                                parent.appendChild(number)
                                // if (
                                //     (
                                //         arr[i] instanceof HTMLInputElement &&
                                //         (
                                //             arr[i].getAttribute('type') === 'email' ||
                                //             arr[i].getAttribute('type') === 'text'
                                //         )
                                //     ) ||
                                //     arr[i] instanceof HTMLTextAreaElement
                                // ) {
                                //     parent.classList.add('voxi-parent')
                                // } else {
                                //     parent.classList.add('voxi-parent')
                                //     parent.classList.add('voxi-fit')
                                //     arr[i].classList.forEach(item => {
                                //         parent.classList.add(item)
                                //     })
                                // }
                                // // parent.appendChild(arr[i].cloneNode(true))
                                // parent.appendChild(number)
                                // setTimeout(() => {
                                //     try {
                                //         // arr[i].replaceWith(parent)
                                //     } catch (e) {
                                //         console.log(e)
                                //     }
                                // }, 1000)
                            }
                            resolve(true)
                        })
                    )
                }
            }
        }
        await Promise.all(promices)
    }
}