const contactForms = document.querySelectorAll('form')
const onSubmitMessage = document.getElementById('onsubmit-message')

// Having two identical forms varying only the placeholders is not the most 
// logical way to handle different languages on the site, but it's the least
// scriptable way to achieve it.

contactForms[0].onsubmit = onSubmitFunction // English
contactForms[1].onsubmit = onSubmitFunction // Spanish

function onSubmitFunction(event) {
    event.preventDefault()

    const formData = new FormData()

    formData.append("name", event.target[0].value)
    formData.append("email", event.target[1].value)
    formData.append("message", event.target[2].value)

    fetch('https://formspree.io/f/xknanezp', { method: 'POST', body: formData, headers: { "Accept": "application/json" } })
        .then(res => {

            onSubmitMessage.className = res.ok ? 'success' : 'error'

            onSubmitMessage.innerHTML = res.ok
                ? `<span class='material-symbols-outlined'>check_circle</span>
                   <span lang='es'>El mensaje ha sido enviado satisfactoriamente.</span>
                   <span lang='en'>The message has been sent successfully.</span>
                `
                : `<span class='material-symbols-outlined'>error</span>
                   <span lang='es'>Ha ocurrido un error con el envío del mensaje.</span>
                   <span lang='en'>An error occurred during the message sending.</span>
                `
            contactForms[0].reset(); contactForms[1].reset();
        })
}

const canvas = document.getElementById('canvas')
const conwayContainer = document.getElementById('conway-game')

const mainGame = new ConwayGame(canvas, { cellColor: '#090', backgroundColor: '#111', boardWidthPx: conwayContainer.clientWidth, boardHeightPx: conwayContainer.clientHeight })

mainGame.play()

const fullscreenButton = document.getElementById('fullscreen-button')

fullscreenButton.onclick = () => {
    if (document.fullscreenElement === null) document.getElementById('contact').requestFullscreen()
    else document.exitFullscreen()
}

document.onfullscreenchange = () => {

    if (document.fullscreenElement) {
        document.getElementById('contact-container').style.visibility = 'hidden'
        fullscreenButton.textContent = 'fullscreen_exit'
    }

    else {
        document.getElementById('contact-container').style.visibility = 'visible'
        fullscreenButton.textContent = 'fullscreen'
    }
}

const playButton = document.getElementById('play-button')

let STARTED_GAME = false

playButton.onclick = () => {
    if (mainGame.getIsPlaying()) {
        playButton.textContent = 'play_arrow'
        STARTED_GAME = false
        mainGame.stop()
    }

    else {
        playButton.textContent = 'pause'
        STARTED_GAME = true
        mainGame.play()
    }
}

const replayButton = document.getElementById('replay-button')

replayButton.onclick = () => {
    mainGame.reset()
    mainGame.play()
    playButton.textContent = 'pause'
}

new IntersectionObserver(event => {

    if (event[0].isIntersecting && STARTED_GAME) mainGame.play()
    else mainGame.stop()

}).observe(canvas)