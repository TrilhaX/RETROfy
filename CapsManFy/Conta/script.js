function getUserInfo() {
    let userInfo = window.sessionStorage.getItem('usuarioLogado');
    if (userInfo) {
        try {
            return JSON.parse(userInfo);
        } catch (e) {
            console.error('Error parsing user info:', e);
            return null;
        }
    }
    return null;
}

function getPlaylists() {
    let playlists = localStorage.getItem('playlists');
    if (playlists) {
        try {
            return JSON.parse(playlists);
        } catch (e) {
            console.error('Error parsing playlists:', e);
            return [];
        }
    }
    return [];
}

function accountInfo() {
    let user = getUserInfo();
    if (user) {
        const nameElement = document.querySelector('#Name');
        const emailElement = document.querySelector('#Email');
        const playlistListElement = document.querySelector('#playlistList');

        if (nameElement) nameElement.innerHTML = user.name || 'Nome não disponível';
        if (emailElement) emailElement.innerHTML = user.email || 'Email não disponível';
        
        if (playlistListElement) {
            const playlists = getPlaylists();
            playlistListElement.innerHTML = ''; // Limpa a lista atual
            
            if (playlists.length > 0) {
                playlists.forEach(playlist => {
                    const li = document.createElement('li');
                    li.textContent = playlist.name;
                    li.className = 'playlist-item';
                    playlistListElement.appendChild(li);
                });
            } else {
                const li = document.createElement('li');
                li.textContent = 'Nenhuma playlist criada';
                li.className = 'playlist-item';
                playlistListElement.appendChild(li);
            }
        }
    } else {
        window.location.href = '../Login/index.html';
    }
}

accountInfo();