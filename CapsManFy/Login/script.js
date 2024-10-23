let submitCadastro = document.querySelector('#register-form .button');
let submitLogin = document.querySelector('#login-form .button');

let users = JSON.parse(localStorage.getItem('usuarios')) || [];

function addUser(event) {
    event.preventDefault();
    let name = document.querySelector('#nameInput2').value;
    let email = document.querySelector('#emailInput2').value;
    let password = document.querySelector('#passwordInput2').value;
    let confirmPassword = document.querySelector('#confirmarSenha').value;
    let errorMessage = document.querySelector("#erroMensagem1");

    errorMessage.style.display = 'none';
    errorMessage.innerHTML = '';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
        errorMessage.innerHTML = "Email e senha são obrigatórios.";
        errorMessage.style.display = 'block';
        return;
    }

    if (!emailRegex.test(email)) {
        errorMessage.innerHTML = "Por favor, insira um email válido.";
        errorMessage.style.display = 'block';
        return;
    }

    if (password !== confirmPassword) {
        errorMessage.innerHTML = "As senhas não são iguais.";
        errorMessage.style.display = 'block';
        return;
    }

    let usuarioExistente = users.find(user => user.email === email);
    if (usuarioExistente) {
        errorMessage.innerHTML = "Já existe um usuário com esse email.";
        errorMessage.style.display = 'block';
        return;
    }

    let conta = { name, email, senha: btoa(password), playlist: [] };
    users.push(conta);
    localStorage.setItem('usuarios', JSON.stringify(users));
    console.log("Cadastro realizado com sucesso!");

    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');

    document.querySelector('#nameInput2').value = '';
    document.querySelector('#emailInput2').value = '';
    document.querySelector('#passwordInput2').value = '';
    document.querySelector('#confirmarSenha').value = '';
}


function loginUser(event) {
    event.preventDefault();
    let email = document.getElementById('emailInput1').value;
    let password = document.getElementById('passwordInput1').value;
    let errorMessage = document.querySelector("#erroMensagem");

    errorMessage.style.display = 'none';
    errorMessage.innerHTML = '';

    if (email === "" || password === "") {
        errorMessage.innerHTML = "Você precisa preencher todos os campos!";
        errorMessage.style.display = 'block';
        return;
    }

    let usuario = users.find(user => user.email === email);
    if (!usuario) {
        errorMessage.innerHTML = "Você precisa cadastrar primeiro.";
        errorMessage.style.display = 'block';
        return;
    }

    if (atob(usuario.senha) === password) {
        sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        console.log("sessionStorage atualizado: ", sessionStorage.getItem('usuarioLogado'));
        window.location.href = "../home/index.html";
    } else {
        errorMessage.innerHTML = "Email ou senha incorretos.";
        errorMessage.style.display = 'block';
    }
}

document.getElementById('show-register').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.remove('hidden');
});

document.getElementById('show-login').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
});

document.querySelector('#buttonSubmit2').addEventListener('click', addUser);
document.querySelector('#buttonSubmit1').addEventListener('click', loginUser);
