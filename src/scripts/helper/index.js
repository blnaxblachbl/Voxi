const svg = (`<svg width="20" height="20" viewBox="0 0 71 130" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M62.6186 60.5296V27.1313C62.6186 12.1773 50.4413 0 35.4873 0C20.5332 0 8.35594 12.1773 8.35594 27.1313V60.5296H0V73.0635C0 91.9153 14.8012 107.353 33.3983 108.449V125.263H16.7119V129.415H54.2881V125.237H37.6017V108.423C56.1988 107.328 71 91.9153 71 73.038V60.5041H62.6186V60.5296ZM12.5339 52.1737H58.4661V73.038C58.4661 85.6993 48.174 95.9914 35.5127 95.9914C22.8515 95.9914 12.5594 85.6993 12.5594 73.038V52.1737H12.5339ZM22.9534 7.92286V12.5339H27.1313V5.75745C29.0929 4.99318 31.2074 4.4582 33.3983 4.27987V16.6864H37.5763V4.27987C39.7671 4.48367 41.8561 4.99318 43.8432 5.75745V12.5084H48.0212V7.92286C54.2881 12.0244 58.4661 19.1066 58.4661 27.1313V47.9957H12.5339V27.1313C12.5339 19.1066 16.6864 12.0244 22.9534 7.92286ZM66.7966 73.0635C66.7966 90.3358 52.7596 104.373 35.4873 104.373C18.2149 104.373 4.17797 90.3358 4.17797 73.0635V64.7076H8.35594V73.0635C8.35594 88.0176 20.5332 100.195 35.4873 100.195C50.4413 100.195 62.6186 88.0176 62.6186 73.0635V64.7076H66.7966V73.0635Z" fill="black" />
    <path d="M29.219 66.7964H25.041V70.9744H29.219V66.7964Z" fill="black" />
    <path d="M37.5784 66.7964H33.4004V70.9744H37.5784V66.7964Z" fill="black" />
    <path d="M45.9338 66.7964H41.7559V70.9744H45.9338V66.7964Z" fill="black" />
</svg>`)

chrome.storage.sync.get(['autorun'], ({ autorun }) => {
    if (autorun) {
        addHelper()
    }
})

chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let key in changes) {
        let storageChange = changes[key]
        if (key === 'autorun') {
            if (storageChange.newValue) {
                addHelper()
            } else {
                removeHelper()
            }
        }
    }
})

const removeHelper = () => {
    const helper = document.getElementById('voxi-helper-container')
    helper.remove()
}

const addHelper = () => {
    const helper = document.createElement("div")
    const svgContainer = document.createElement("div")
    const textContainer = document.createElement("div")
    svgContainer.innerHTML = svg
    textContainer.setAttribute("class", "voxi-helper-text")
    textContainer.setAttribute("id", "voxi-helper")
    svgContainer.setAttribute("class", "voxi-helper-icon")
    helper.setAttribute("class", "voxi-helper-container")
    helper.setAttribute("id", "voxi-helper-container")
    helper.appendChild(svgContainer)
    helper.appendChild(textContainer)
    document.body.appendChild(helper)
}