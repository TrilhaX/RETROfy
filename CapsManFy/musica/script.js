let musicas = JSON.parse(localStorage.getItem('musicas')) || [];

function cadastrarMusica(event) {
    event.preventDefault();
    
    let nome = document.getElementById('titulo').value;
    let artista = document.getElementById('artista').value;
    let genero = document.getElementById('genero').value;
    let duracao = document.getElementById('duracao').value;
    let link = document.getElementById('link').value;
    let imagemInput = document.getElementById('imagem');
    let erroH1 = document.getElementById('erroH1');

    if (nome === "" || artista === "" || genero === "" || duracao === "" || link === "") {
        erroH1.innerHTML = "Todos os campos têm que estar preenchidos!";
        return;
    }

    const exists = musicas.some(m => m.nome === nome && m.artista === artista);

    if (exists) {
        erroH1.innerHTML = "Já existe essa música";
        return;
    }

    const musica = { nome, artista, genero, duracao, link };

    if (imagemInput.files.length > 0) {
        const reader = new FileReader();
        
        reader.onload = function(event) {
            musica.imagem = event.target.result; // URL base64 da imagem
            musicas.push(musica);
            localStorage.setItem('musicas', JSON.stringify(musicas));
            console.log("Música cadastrada com sucesso!");
            window.location.href = "../Home/index.html";
        };

        reader.readAsDataURL(imagemInput.files[0]); // Lê a imagem como URL base64
    } else {
        // Se não houver imagem, ainda podemos salvar a música sem a imagem
        musicas.push(musica);
        localStorage.setItem('musicas', JSON.stringify(musicas));
        console.log("Música cadastrada com sucesso!");
        window.location.href = "../Home/index.html";
    }
}

document.querySelector("#cadastrarMusica").addEventListener("click", cadastrarMusica);