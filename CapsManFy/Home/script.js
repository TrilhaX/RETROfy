document.addEventListener('DOMContentLoaded', () => {
    let musica = null;
    const progressBar = document.getElementById('progressBar');
    const carousels = document.querySelectorAll('.carrossel');
    let musicas = JSON.parse(localStorage.getItem('musicas')) || [];
    let musicContainer = document.querySelector(".slides");
    let audioPlayer = document.getElementById('audioPlayer');
    let currentMusicIndex = 0;

    function abrirMusicaPlay() {
        const display = document.querySelector(".musicaPlay");
        display.style.display = "flex";
    }

    function abrirMusicaSet(){
        window.location.href = "../musica/index.html";
    }

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

    audioPlayer.addEventListener('timeupdate', () => {
        if (audioPlayer.duration) {
            const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressBar.style.width = `${percent}%`;
        }
    });

    function createMusicDiv(title, imageUrl, mp3Url) {
        const newDiv = document.createElement('div');
        newDiv.classList.add('slide');

        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = title;

        const a = document.createElement('a');
        a.href = "#";

        a.onclick = function(event) {
            event.preventDefault();
            playMusic(mp3Url, imageUrl, title);
        };

        a.appendChild(img);
        newDiv.appendChild(a);
        musicContainer.appendChild(newDiv);
    }

    function playMusic(mp3Url, imageUrl, title) {
        audioPlayer.src = mp3Url;
        document.getElementById('musicaImagem').src = imageUrl;
        document.getElementById('musicaNome').innerText = title;
        audioPlayer.play();
        document.querySelector('.musicaPlay').style.display = 'flex';
    }

    function nextMusic() {
        currentMusicIndex = (currentMusicIndex + 1) % musicas.length;
        const nextMusic = musicas[currentMusicIndex];
        playMusic(nextMusic.mp3, nextMusic.imagem, nextMusic.nome);
    }

    function previousMusic() {
        currentMusicIndex = (currentMusicIndex - 1 + musicas.length) % musicas.length;
        const prevMusic = musicas[currentMusicIndex];
        playMusic(prevMusic.mp3, prevMusic.imagem, prevMusic.nome);
    }

    document.getElementById('btnPlayPause').addEventListener('click', () => {
        if (audioPlayer.src) {
            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
        }
    });

    document.getElementById('btnNextMusica').addEventListener('click', nextMusic);
    document.getElementById('btnPrevMusica').addEventListener('click', previousMusic);

    function displayMusics() {
        const musics = JSON.parse(localStorage.getItem('musicas')) || [];
        musics.forEach((music) => {
            createMusicDiv(music.nome, music.imagem, music.mp3);
        });
    }

    document.getElementById('addButton').addEventListener('click', abrirMusicaSet);

    displayMusics();
});
