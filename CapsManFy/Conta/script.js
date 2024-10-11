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

function accountInfo() {
    let user = getUserInfo();
    if (user) {
        const nameElement = document.querySelector('#Name');
        const emailElement = document.querySelector('#Email');
        const playlistElement = document.querySelector('#Playlist');

        if (nameElement) nameElement.innerHTML = user.name || 'Nome não disponível';
        if (emailElement) emailElement.innerHTML = user.email || 'Email não disponível';
        if (playlistElement) playlistElement.innerHTML = user.playlist || user.playlist.join(', ') + 'Playlist vazia';
    } else {
        window.location.href = '../Login/index.html';
    }
}

accountInfo();