chrome.storage.sync.get(['started'], ({ started }) => {
    if (started) {
        markElements()
    }
})

chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let key in changes) {
        let storageChange = changes[key]
        if (key === 'started') {
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
        if (arr[i] instanceof HTMLInputElement || arr[i] instanceof HTMLTextAreaElement) {
            arr[i].removeAttribute('data-after')
            arr[i].classList.remove("voxi-input")
            arr[i].parentNode.replaceWith(arr[i])
        } else {
            arr[i].removeAttribute("data-after")
            arr[i].classList.remove('voxi-after')
        }
    }
}

const markElements = () => {
    const arr = document.querySelectorAll(elemenst.join(', '))
    for (let i = 0, l = arr.length; i < l; i++) {
        if (arr[i] instanceof HTMLInputElement || arr[i] instanceof HTMLTextAreaElement) {
            arr[i].setAttribute("data-after", i + 1)
            arr[i].classList.add("voxi-input")
            const parent = document.createElement('div')
            const number = document.createElement('span')
            number.setAttribute("data-after", i + 1)
            if (arr[i].getAttribute('type') === 'submit') {
                parent.classList.add('voxi-input-parent-submit')
            } else {
                parent.classList.add('voxi-input-parent')
            }
            number.classList.add('voxi-after-input')
            // number.innerHTML = `${i}`
            if (arr[i] instanceof Node) {
                parent.appendChild(arr[i].cloneNode(true))
                parent.appendChild(number)
                arr[i].replaceWith(parent)
            }
        } else {
            arr[i].setAttribute("data-after", i + 1)
            arr[i].classList.add('voxi-after')
        }
    }
}