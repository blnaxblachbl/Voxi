// const buttons = document.querySelectorAll('button, input[type="button"]')
const buttons = document.querySelectorAll('button')
const links = document.getElementsByTagName("a")
const inputs = document.querySelectorAll('input[type="text"], input[type="select"], input[type="radio"]')

for (let i = 0, l = buttons.length; i < l; i++) {
    buttons[i].setAttribute("data-after", i)
}
for (let i = 0, l = links.length; i < l; i++) {
    links[i].setAttribute("data-after", i)
}
for (let i = 0, l = inputs.length; i < l; i++) {
    inputs[i].setAttribute("data-after", i)
    const parent = document.createElement('div')
    const number = document.createElement('span')
    parent.classList.add('voxi-input-parent')
    number.classList.add('voxi-input-after')
    number.innerHTML = `${i}`
    if (inputs[i] instanceof Node) {
        parent.appendChild(inputs[i].cloneNode(true))
        parent.appendChild(number)
        inputs[i].replaceWith(parent)
    }
}