document.addEventListener('DOMContentLoaded', () => {
    let musica = null;
    const progressBar = document.getElementById('progressBar');
    const carousels = document.querySelectorAll('.carrossel');
    let musicas = JSON.parse(localStorage.getItem('musicas')) || [];
    let playlists = JSON.parse(localStorage.getItem('playlists')) || [];
    let audioPlayer = document.getElementById('audioPlayer');
    let currentMusicIndex = 0;
    let currentPlaylist = [];
    let isPlayingFromPlaylist = false;

    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const formattedHours = hours > 0 ? `${hours}:` : '';
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
        return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
    }

    function playMusic(mp3Url, imageUrl, title) {
        if (!mp3Url || !imageUrl) {
            console.error('Caminho para a música ou imagem não definido:', mp3Url, imageUrl);
            return;
        }
    
        audioPlayer.src = mp3Url;
        document.getElementById('musicaImagem').src = imageUrl;
        document.getElementById('musicaNome').innerText = title;
        audioPlayer.play();
        document.querySelector('.musicaPlay').style.display = 'flex';
    }
    

    // Função para reproduzir a próxima música
    function nextMusic() {
        if (currentPlaylist.length === 0) {
            console.error('A playlist está vazia.');
            return;
        }
    
        currentMusicIndex = (currentMusicIndex + 1) % currentPlaylist.length;  // Próxima música
        const nextMusic = currentPlaylist[currentMusicIndex];
    
        if (!nextMusic || !nextMusic.mp3) {
            console.error('A música não tem um mp3 válido:', nextMusic);
            return;
        }
    
        playMusic(nextMusic.mp3, nextMusic.imagem, nextMusic.nome);
    }
    
    // Função para reproduzir a música anterior
    function previousMusic() {
        if (currentPlaylist.length === 0) {
            console.error('A playlist está vazia.');
            return;
        }
    
        currentMusicIndex = (currentMusicIndex - 1 + currentPlaylist.length) % currentPlaylist.length;  // Música anterior
        const prevMusic = currentPlaylist[currentMusicIndex];
    
        if (!prevMusic || !prevMusic.mp3) {
            console.error('A música não tem um mp3 válido:', prevMusic);
            return;
        }
    
        playMusic(prevMusic.mp3, prevMusic.imagem, prevMusic.nome);
    }

    // Evento para atualizar o progresso da música
    audioPlayer.addEventListener('timeupdate', () => {
        if (audioPlayer.duration) {
            const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressBar.style.width = `${percent}%`;

            const currentTime = formatTime(audioPlayer.currentTime);
            const duration = formatTime(audioPlayer.duration);

            document.getElementById('currentTime').innerText = currentTime;
            document.getElementById('duration').innerText = duration;
        }
    });

    // Quando a música termina, toca a próxima da playlist
    audioPlayer.addEventListener('ended', () => {
        if (isPlayingFromPlaylist) {
            nextMusic();
        }
    });

    // Função para iniciar a reprodução da playlist
    function playPlaylist(playlist) {
        currentPlaylist = playlist.musics;
        isPlayingFromPlaylist = true;
        currentMusicIndex = 0;
        const firstMusic = currentPlaylist[currentMusicIndex];
        playMusic(firstMusic.mp3, firstMusic.imagem, firstMusic.nome);  // Toca a primeira música
    }

    // Exibindo playlists e permitindo reprodução
    function displayPlaylists() {
        const playlistContainer = document.querySelector('.playlistDiv .slides');
        playlistContainer.innerHTML = '';

        playlists.forEach((playlist) => {
            const playlistDiv = document.createElement('div');
            playlistDiv.classList.add('playlist');

            const coverImage = playlist.cover || '../default-cover.png';

            playlistDiv.innerHTML = `
                <div class="playlistCover">
                    <img src="${coverImage}" alt="Capa da playlist" class="coverImage" />
                </div>
                <h3>${playlist.name}</h3>
            `;

            playlistDiv.addEventListener('click', () => {
                playPlaylist(playlist);  // Toca as músicas da playlist selecionada
            });

            playlistContainer.appendChild(playlistDiv);
        });
    }

    // Exibindo músicas normais (fora de playlists)
    function displayMusics() {
        const musicContainer = document.querySelector(".slides");
        musicContainer.innerHTML = '';  // Limpar o container de músicas

        musicas.forEach((music) => {
            const musicDiv = document.createElement('div');
            musicDiv.classList.add('slide');

            const img = document.createElement('img');
            img.src = music.imagem;
            img.alt = music.nome;

            const a = document.createElement('a');
            a.href = "#";
            a.onclick = function(event) {
                event.preventDefault();
                playMusic(music.mp3, music.imagem, music.nome);
            };

            a.appendChild(img);
            musicDiv.appendChild(a);
            musicContainer.appendChild(musicDiv);
        });
    }

    // Adicionando eventos aos botões
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

    // Inicializando as músicas e playlists
    displayMusics();
    displayPlaylists();
});