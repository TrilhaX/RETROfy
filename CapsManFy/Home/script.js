let musica = null;
const carousels = document.querySelectorAll('.carrossel');
let musicas = JSON.parse(localStorage.getItem('musicas')) || [];
let musicContainer = document.querySelector(".slides")

carousels.forEach((carousel, index) => {
    const slides = carousel.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(i) {
        slides.forEach((slide, j) => {
            slide.classList.remove('active');
            if (j === i) {
                slide.classList.add('active');
            }
        });
        const offset = -i * 100;
        carousel.querySelector('.slides').style.transform = `translateX(${offset}%)`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function previousSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    window[`nextSlide${index}`] = nextSlide;
    window[`previousSlide${index}`] = previousSlide;
});

function accountInfo(){
    let account = window.sessionStorage.getItem('usuarioLogado');

    account = JSON.parse(account)
    console.log(account.name)
}

function abrirDisplayMusica(){
    let display = document.querySelector(".musicaPlay")
    display.style.display = "flex"
}

function abrirConta(){
    window.location.href = "../Conta/index.html"
}

function abrirAddMusica(){
    window.location.href = "../musica/index.html"
}function createMusicDiv(title, imageUrl) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('slide-active');

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = title;

    const a = document.createElement('a');
    const musics = JSON.parse(localStorage.getItem('musicas')) || [];
    
    // Find the music object by title
    const music = musics.find(music => music.nome === title);
    
    if (music) {
        a.href = music.link;
    } else {
        console.warn(`No music found for title: ${title}`);
    }

    a.appendChild(img);
    newDiv.appendChild(a);
    musicContainer.appendChild(newDiv);
}


function displayMusics() {
    const musics = JSON.parse(localStorage.getItem('musicas')) || [];
    musics.forEach(music => {
        createMusicDiv(music.nome, music.imagem);
    });
}

document.querySelector("#imagemConta").addEventListener("click", abrirConta)
document.querySelector("#addButton").addEventListener("click", abrirAddMusica)

document.querySelectorAll('.prev').forEach((button, i) => {
    button.onclick = () => {
        window[`previousSlide${i}`]();
    };
});

document.querySelectorAll('.next').forEach((button, i) => {
    button.onclick = () => {
        window[`nextSlide${i}`]();
    };
});


displayMusics();
abrirMusicaPlay();