let musicas = JSON.parse(localStorage.getItem('musicas')) || [];

function cadastrarMusica(event) {
    event.preventDefault();

    let nome = document.getElementById('titulo').value;
    let artista = document.getElementById('artista').value;
    let genero = document.getElementById('genero').value;
    let duracao = document.getElementById('duracao').value;
    let imagemInput = document.getElementById('imagem');
    let mp3Input = document.getElementById('mp3');
    let erroH1 = document.getElementById('erroH1');

    if (nome === "" || artista === "" || genero === "" || duracao === "") {
        erroH1.innerHTML = "Todos os campos têm que estar preenchidos!";
        return;
    }

    const exists = musicas.some(m => m.nome === nome && m.artista === artista);

    if (exists) {
        erroH1.innerHTML = "Já existe essa música";
        return;
    }

    const musica = { nome, artista, genero, duracao };

    if (imagemInput.files.length > 0) {
        const readerImagem = new FileReader();
        readerImagem.onload = function(event) {
            musica.imagem = event.target.result;
        };
        readerImagem.readAsDataURL(imagemInput.files[0]);
    }

    if (mp3Input.files.length > 0) {
        const readerMp3 = new FileReader();
        readerMp3.onload = function(event) {
            musica.mp3 = event.target.result;
            musicas.push(musica);
            localStorage.setItem('musicas', JSON.stringify(musicas));
            console.log("Música cadastrada com sucesso!");
            window.location.href = "../Home/index.html";
        };
        readerMp3.readAsDataURL(mp3Input.files[0]);
    } else {
        musicas.push(musica);
        localStorage.setItem('musicas', JSON.stringify(musicas));
        console.log("Música cadastrada com sucesso!");
        window.location.href = "../Home/index.html";
    }
}

document.querySelector("#cadastrarMusica").addEventListener("click", cadastrarMusica);