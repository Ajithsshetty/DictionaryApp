console.log("dictionary App")
const input = document.querySelector("input")
const button = document.querySelector("button")
const dictionary = document.querySelector(`.dictionary-app`)

//https://api.dictionaryapi.dev/api/v2/entries/en/<word>

async function dictionaryfn(word) {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(res => res.json())
    return res[0]
}
dictionaryfn(`Book`)

button.addEventListener(`click`,fetchandcratecard)



async function fetchandcratecard() {
    const data = await dictionaryfn(input.value)
    console.log(data)

    let partofSpeechArray = []
    for(let i=0; i<data.meanings.length-1; i++) {
        partofSpeechArray.push(data.meanings[i].partofSpeech)
    }

    dictionary.innerHTML = `
    <div class="card">
            <div class="property">
                <span>Word :- </span>
                <span>${data.word}</span>
            </div>

            <div class="property">
                <span>Phonetics :- </span>
                 <span>${data.phonetic}</span>
            </div>

            <div class="property">
                <span>
                <audio controls src="${data.phonetics[0].audio}"></audio>
                </span>
            </div>

            <div class="property">
                <span>Definition :- </span>
                 <span>${data.meanings[0].definitions[0].definition} </span>
            </div>

            <div class="property">
                <span>Example :- </span>
                <span>${data.meanings[1].definitions[0].example} </span>
            </div>

            <div class="property">
                <span>Parts of speech:- ${partofSpeechArray.map(e => e).join(', ')} </span>
            </div>`
}