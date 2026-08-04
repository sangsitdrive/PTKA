// =========================
// FORUM PTKA 2026
// script.js
// =========================

const TOTAL_SLIDES = 31;
const DURATION = 10000;

let current = 1;
let autoPlay = true;
let timer = null;

const loading = document.getElementById("loading");
const cover = document.getElementById("cover");
const viewer = document.getElementById("viewer");

const slide = document.getElementById("slide");
const nomor = document.getElementById("nomor");
const bar = document.getElementById("bar");

const music = document.getElementById("music");
const playBtn = document.getElementById("playBtn");

// Loading selesai
window.onload = () => {

    setTimeout(() => {

        loading.style.display = "none";
        cover.style.display = "flex";

    }, 1500);

};

// Tombol mulai
document.getElementById("startBtn").onclick = () => {

    cover.style.display = "none";
    viewer.style.display = "block";

    loadSlide();

    music.play().catch(() => {});

    startAuto();

};

// Menampilkan slide
function loadSlide() {

    slide.classList.remove("fade");
    void slide.offsetWidth;
    slide.classList.add("fade");

    slide.src =
        `assets/images/slide${String(current).padStart(2,"0")}.jpg`;

    nomor.innerHTML =
        current + " / " + TOTAL_SLIDES;

    progress();

}

// Progress Bar
function progress() {

    clearInterval(bar.timer);

    bar.style.transition = "none";
    bar.style.width = "0%";

    setTimeout(() => {

        bar.style.transition = `width ${DURATION}ms linear`;
        bar.style.width = "100%";

    }, 50);

}

// Next
function nextSlide() {

    current++;

    if (current > TOTAL_SLIDES) {

        current = 1;

    }

    loadSlide();

}

// Previous
function prevSlide() {

    current--;

    if (current < 1) {

        current = TOTAL_SLIDES;

    }

    loadSlide();

}

// Auto Play
function startAuto() {

    timer = setInterval(nextSlide, DURATION);

}

// Pause
function playPause() {

    if (autoPlay) {

        clearInterval(timer);

        autoPlay = false;

        playBtn.innerHTML = "▶";

    } else {

        autoPlay = true;

        playBtn.innerHTML = "⏸";

        startAuto();

    }

}

// Fullscreen
function toggleFullscreen() {

    if (!document.fullscreenElement) {

        document.documentElement.requestFullscreen();

    } else {

        document.exitFullscreen();

    }

}

// Keyboard
document.addEventListener("keydown", (e) => {

    switch (e.key) {

        case "ArrowRight":

            nextSlide();

            break;

        case "ArrowLeft":

            prevSlide();

            break;

        case " ":

            e.preventDefault();

            playPause();

            break;

        case "f":

        case "F":

            toggleFullscreen();

            break;

    }

});