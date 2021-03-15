window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition

let recognition = new SpeechRecognition()
recognition.continuous = true
recognition.lang = 'en-US'
recognition.interimResults = false
recognition.maxAlternatives = 1

export {
    recognition
}