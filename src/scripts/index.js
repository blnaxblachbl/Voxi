import { recognition, state } from './recognition'
import "./parser"

recognition.onerror = (e) => {
    console.log("error", e)
    if (!state.started) {
        stopListening()
        startListening()
    } else {
        startListening()
    }
}

const startListening = () => {
    if (!state.started) {
        recognition.start()
        state.started = true
        console.log("start listening")
    }
}

const stopListening = () => {
    if (state.started) {
        recognition.stop()
        state.started = false
        console.log("stop listening")
    }
}

window.addEventListener('blur', stopListening)
window.addEventListener('focus', startListening)
window.addEventListener('load', startListening)