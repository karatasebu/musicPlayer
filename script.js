const container = document.querySelector(".container")

const playBtn = document.querySelector("#play")

const prevBtn = document.querySelector("#prev")

const nextBtn = document.querySelector("#next")

const audio = document.querySelector("#audio")

const progress = document.querySelector(".progress")

const progressContainer = document.querySelector(".progress-container")

const title = document.querySelector("#title")

const cover = document.querySelector("#cover")

const musics = ["sushi", "ruh", "makina"]

let musicIndex = 2

loadMusic(musics[musicIndex])

function loadMusic(music) {
    title.innerText = music
    
    audio.src = `musics/${music}.mp3`
    cover.src = `images/${music}.jpg`
}

function playMusic() {
    container.classList.add("play")

    playBtn.querySelector(".fas").classList.remove("fa-play")
    playBtn.querySelector(".fas").classList.add("fa-pause")

    audio.play()
}

function pauseMusic() {
    container.classList.remove("play")

    playBtn.querySelector(".fas").classList.remove("fa-pause")
    playBtn.querySelector(".fas").classList.add("fa-play")

    audio.pause()
}

function prevMusic() {
    musicIndex--

    if(musicIndex < 0) {
        musicIndex = musics.length - 1
    }

    loadMusic(musics[musicIndex])
    
    playMusic()
}

function nextMusic() {
    musicIndex++

    if(musicIndex > musics.length - 1) {
        musicIndex = 0
    }

    loadMusic(musics[musicIndex])
    
    playMusic()
}

function updateProgress(event) {
    const {duration, currentTime} = event.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

function setProgress(event) {
    const width = this.clientWidth
    const clickX = event.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

// Event Listeners

playBtn.addEventListener("click", () => {
    const isPlaying = container.classList.contains("play")

    if(isPlaying){
        pauseMusic()
    }else{
        playMusic()
    }
})

prevBtn.addEventListener("click", prevMusic)

nextBtn.addEventListener("click", nextMusic)

audio.addEventListener("timeupdate", updateProgress)

progressContainer.addEventListener("click", setProgress)

audio.addEventListener("ended", nextMusic)