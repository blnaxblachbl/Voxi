/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/parser.js":
/*!*******************************!*\
  !*** ./src/scripts/parser.js ***!
  \*******************************/
/***/ (() => {

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

/***/ }),

/***/ "./src/scripts/recognition.js":
/*!************************************!*\
  !*** ./src/scripts/recognition.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "recognition": () => (/* binding */ recognition)
/* harmony export */ });
window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition

let recognition = new SpeechRecognition()
recognition.continuous = true
recognition.lang = 'en-US'
recognition.interimResults = false
recognition.maxAlternatives = 1



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _recognition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./recognition */ "./src/scripts/recognition.js");
/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parser */ "./src/scripts/parser.js");
/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_parser__WEBPACK_IMPORTED_MODULE_1__);



let lascommand = ""
let mode = "command"
let writeTarget = 0
let started = false

const commands = (command) => {
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

const scrollDown = () => {
    let duration = 0
    let scrollDownInterval = setInterval(() => {
        if (duration < 500) {
            window.scrollBy(0, 10)
            duration = duration + 10
        } else {
            clearInterval(scrollDownInterval)
        }
    }, 10);
}

const scrollUp = () => {
    let duration = 0
    let scrollUpInterval = setInterval(() => {
        if (duration < 500) {
            window.scrollBy(0, -10)
            duration = duration + 10
        } else {
            clearInterval(scrollUpInterval)
        }
    }, 10);
}

_recognition__WEBPACK_IMPORTED_MODULE_0__.recognition.onresult = (event) => {
    const { results } = event
    const text = results[results.length - 1][0].transcript
    if (mode === 'command') {
        commands(text)
    }
    if (mode === 'write') {
        const inputs = document.querySelectorAll(`input[data-after='${writeTarget}']`)
        if (inputs.length > 0) {
            const text = results[results.length - 1][0].transcript
            console.log("text", text)
            inputs[0].value = text
            writeTarget = 0
            mode = "command"
        }
    }
}

_recognition__WEBPACK_IMPORTED_MODULE_0__.recognition.onerror = () => {
    stopListening()
    startListening()
}

const startListening = () => {
    if (!started) {
        console.log("start listening")
        _recognition__WEBPACK_IMPORTED_MODULE_0__.recognition.start()
        started = true
    }
}

const stopListening = () => {
    console.log("stop listening")
    _recognition__WEBPACK_IMPORTED_MODULE_0__.recognition.stop()
    started = false
}

window.addEventListener('blur', stopListening)
window.addEventListener('focus', startListening)
window.addEventListener('load', startListening)
})();

/******/ })()
;
//# sourceMappingURL=scripts.js.map