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
            processarMp3(musica, mp3Input);
        };
        readerImagem.readAsDataURL(imagemInput.files[0]);
    } else {
        processarMp3(musica, mp3Input);
    }
}

function processarMp3(musica, mp3Input) {
    if (mp3Input.files.length > 0) {
        const readerMp3 = new FileReader();
        readerMp3.onload = function(event) {
            musica.mp3 = event.target.result;
            salvarMusica(musica);
        };
        readerMp3.readAsDataURL(mp3Input.files[0]);
    } else {
        salvarMusica(musica);
    }
}

function salvarMusica(musica) {
    musicas.push(musica);
    try {
        localStorage.setItem('musicas', JSON.stringify(musicas));
        console.log("Música cadastrada com sucesso!");
        window.location.href = "../home/index.html";
    } catch (error) {
        if (error.name === 'QuotaExceededError') {
            alert("O armazenamento local está cheio! Por favor, libere algum espaço.");
        } else {
            console.error("Erro ao salvar a música:", error);
        }
    }
}

document.querySelector("#cadastrarMusica").addEventListener("click", cadastrarMusica);