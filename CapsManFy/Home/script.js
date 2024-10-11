const carousels = document.querySelectorAll('.carrossel');

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

document.querySelector("#slideP").addEventListener("click", abrirDisplayMusica)
document.querySelector("#slideM").addEventListener("click", abrirDisplayMusica)
document.querySelector("#imagemConta").addEventListener("click", abrirConta)

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

accountInfo()