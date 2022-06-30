const startScreen = document.querySelector('.secao-inicio')
const gameScreen = document.querySelector('.secao-game')

const countLetter = document.getElementById('countLetter')
const wordEl = document.getElementById('hangmanWord')
const sortword = document.getElementById('sortword')
const tip = document.getElementById('hangmanTip')
const tipEl = document.querySelector('.tip')
const playedLettersEl = document.querySelector('.played-letters')
const btnStartEl = document.querySelector('.btn-comecar')
const hangmanWord = document.querySelector('.hangman-word')

const ccountEl = document.querySelector('.ccount')
const ecountEl = document.querySelector('.ecount')

const winModalEl = document.getElementById('myModal')
const winModal = new bootstrap.Modal(winModalEl, {})

const wordList = ['bala', 'ninho', 'joaninha', 'pulseira', 'computador', 'sorvete', 
                    'doce', 'pizza', 'jogos', 'festa', 'papelaria', 'cadeira', 'celular', 'moletom', 'diamante', 'sapatos', 'tenis',
                'torta', 'chocolate', 'mochila', 'tipografia', 'livros', 'uruguai', 'yasmin', 'colar', 'pessoas', 'esmalte', 'salgado', 'chiclete', 
                'abelha', 'flores']
const randomword   = () => Math.floor(Math.random() * (30 - 0)) + 0

let word = []
let playedLetters = []
let gameStarted = false
let ccount = 0
let ecount = 0
let modalopen = false

gameScreen.classList.add('d-none')

wordEl.addEventListener('keyup', e => {
    countLetter.textContent = wordEl.value.length

})

sortword.addEventListener('click', () => {
    wordEl.disabled = sortword.checked
    tip.disabled = sortword.checked
})

let startGame = () => {

    if (wordEl.value.length > 0 || sortword.checked) {

        if(sortword.checked){
            wordEl.value = wordList[randomword()]
        }

        word = wordEl.value.toUpperCase().match(/[\w]/g)

        word.forEach(letter => {
            hangmanWord.innerHTML += `<div class="hangman-word-letter">
                                    <span class="hangman-word-letter-letter"></span>
                                </div>`
        })

        tipEl.textContent = tip.value

        startScreen.classList.add('d-none')
        gameScreen.classList.remove('d-none')

        gameStarted = true

    }
}

btnStartEl.addEventListener('click', startGame)

let verifyLetter = letter => {

    let haveInWord = word.filter(letra => letra == letter).length
    let havePlayedLetters = playedLetters.filter(l => l.letra == letter).length

    if (havePlayedLetters == 0) {

        let objLetter = {
            "letra": letter,
            "tem": false
        }

        if (haveInWord > 0) {

            objLetter.tem = true


            word.forEach((l, i) => {
                if (letter == l) {
                    document.querySelectorAll('.hangman-word-letter-letter')[i].textContent = l

                    ccount++

                }
            })

        } else {
            ecount++
        }

        playedLetters.push(objLetter)

        playedLettersEl.innerHTML = ''
        playedLetters.forEach(l => {
            if (l.tem) {
                playedLettersEl.innerHTML += `<span class="mx-1 text-success">${l.letra}</span>`
            } else {
                playedLettersEl.innerHTML += `<span class="mx-1">${l.letra}</span>`
            }
        })

        ccountEl.textContent = ccount
        ecountEl.textContent = ecount

        if (ccount == word.length) {

            winModalEl.querySelector('.modal-body').innerHTML = `<p>Você acertou a palavra <span class="fw-bold>"'${wordEl.value}'</span>.</p>
            
            <p class="fw-bold mb-0">Acertos: <span class="win-rights text-success">${ccount}</span></p>
            <p class="fw-bold m-0">Erros: <span class="win-wrongs text-danger">${ecount}</span></p>`

            gameStarted = false

            winModal.show()

        } else if (ecount >= 7) {

            winModalEl.querySelector('.modal-body').innerHTML = `<p>Você perdeu a palavra era <span class="fw-bold>"'${wordEl.value}'</span>.</p>
            
            <p class="fw-bold mb-0">Acertos: <span class="win-rights text-success">${ccount}</span></p>
            <p class="fw-bold m-0">Erros: <span class="win-wrongs text-danger">${ecount}</span></p>`


            gameStarted = false

            winModal.show()


        }
    }
}

document.addEventListener('keypress', e => {
    let key = e.key.toUpperCase()

    if (gameStarted) {
        verifyLetter(key)
    } else if (key == 'ENTER' && !modalopen) {
        startGame()
    }
})

winModalEl.addEventListener('show.bs.modal', () => {
    modalopen = true
})

winModalEl.addEventListener('hide.bs.modal', () => {

    wordEl.value = ''
    tipEl.value = ''


    startScreen.classList.remove('d-none')
    gameScreen.classList.add('d-none')

    word = []
    playedLetters = []
    ccount = 0
    ecount = 0

    hangmanWord.innerHTML = ''
    playedLettersEl.innerHTML = ''
    ccountEl.textContent = 0
    ecountEl.textContent = 0

    modalopen = false

})