const buttons = document.getElementsByTagName("button")
const links = document.getElementsByTagName("a")
// const inputs = document.getElementsByTagName("input")

for (let i = 0, l = buttons.length; i < l; i++) {
    buttons[i].setAttribute("data-after", i)
}
for (let i = 0, l = links.length; i < l; i++) {
    links[i].setAttribute("data-after", i)
}
// for (let i = 0, l = inputs.length; i < l; i++) {

//     const id = inputs[i].id ? inputs[i].id : `input${i}`
//     const parentDiv = inputs[i].parentNode
//     const label = document.createElement("label")

//     label.htmlFor = id
//     label.setAttribute("data-after", i)

//     // console.log(parentDiv)

//     parentDiv.insertBefore(label, inputs[i].nextSibling)
// }