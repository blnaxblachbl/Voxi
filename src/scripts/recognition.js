window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
window.SpeechGrammarList = window.webkitSpeechGrammarList || window.SpeechGrammarList

var grammar = '#JSGF V1.0; grammar commands; public <command> = click | tab | prev | next | tab | previous | close | up | lower | higher | forward | back | search | more ;'
let recognition = new SpeechRecognition()
var speechRecognitionList = new SpeechGrammarList()
speechRecognitionList.addFromString(grammar, 1)
recognition.grammars = speechRecognitionList
recognition.continuous = true
recognition.lang = 'en-US'
recognition.interimResults = true
recognition.maxAlternatives = 1

export {
    recognition
}