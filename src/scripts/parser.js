chrome.storage.sync.get(['autorun'], ({ autorun }) => {
    console.log("autorun", autorun)
    if (autorun) {
        markElements()
    }
})

const markElements = () => {
    const arr = document.querySelectorAll('button, a, input[type="text"], input[type="select"], input[type="radio"], input[type="button"]')
    for (let i = 0, l = arr.length; i < l; i++) {
        if (arr[i] instanceof HTMLInputElement) {
            arr[i].setAttribute("data-after", i)
            const parent = document.createElement('div')
            const number = document.createElement('span')
            number.setAttribute("data-after", i)
            parent.classList.add('voxi-input-parent')
            number.classList.add('voxi-after')
            // number.innerHTML = `${i}`
            if (arr[i] instanceof Node) {
                parent.appendChild(arr[i].cloneNode(true))
                parent.appendChild(number)
                arr[i].replaceWith(parent)
            }
        } else {
            arr[i].setAttribute("data-after", i)
            arr[i].classList.add('voxi-after')
        }
    }
}