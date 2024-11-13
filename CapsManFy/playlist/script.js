document.addEventListener('DOMContentLoaded', () => {
    let musicas = JSON.parse(localStorage.getItem('musicas')) || [];
    let playlists = JSON.parse(localStorage.getItem('playlists')) || [];

    function displayAvailableMusics() {
        const availableMusicsContainer = document.getElementById('availableMusics');
        availableMusicsContainer.innerHTML = '';

        if (musicas.length === 0) {
            availableMusicsContainer.innerHTML = '<p>Não há músicas disponíveis.</p>';
            return;
        }

        musicas.forEach((music, index) => {
            const musicDiv = document.createElement('div');
            musicDiv.classList.add('musicOption');
            
            musicDiv.innerHTML = `
                <input type="checkbox" id="music_${index}" class="musicCheckbox">
                <label for="music_${index}">${music.nome}</label>
            `;
            
            availableMusicsContainer.appendChild(musicDiv);
        });
    }

    function getCoverImageBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    async function savePlaylist() {
        const playlistName = document.getElementById('playlistName').value;
        if (!playlistName) {
            alert('Por favor, insira o nome da playlist.');
            return;
        }

        const selectedMusics = [];
        const checkboxes = document.querySelectorAll('.musicCheckbox');
        
        let coverImage = '';
        const coverInput = document.getElementById('playlistCover');
        
        if (coverInput.files && coverInput.files[0]) {
            coverImage = await getCoverImageBase64(coverInput.files[0]);
        }

        checkboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                selectedMusics.push(musicas[index]);
            }
        });

        if (selectedMusics.length === 0) {
            alert('Selecione pelo menos uma música para adicionar à playlist.');
            return;
        }

        const newPlaylist = {
            name: playlistName,
            cover: coverImage,
            musics: selectedMusics.map(m => m.nome),
        };

        playlists.push(newPlaylist);
        localStorage.setItem('playlists', JSON.stringify(playlists));
        
        alert('Playlist criada com sucesso!');
    }

    document.getElementById('addPlaylistButton').addEventListener('click', savePlaylist);

    displayAvailableMusics();
});