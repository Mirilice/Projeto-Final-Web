function buscarCEP() {
    let cep = document.getElementById("cep").value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cep.length === 8) {
        let url = `https://viacep.com.br/ws/${cep}/json/`;
        
        fetch(url)
        .then(response => response.json())
        .then(data => {
            if (!data.erro) {
                document.getElementById("estado").value = data.uf;  // Preenche o campo de estado com a UF retornada
            } else {
                alert("CEP não encontrado.");
            }
        })
        .catch(() => alert("Erro ao buscar o CEP."));
    } else {
        alert("Por favor, insira um CEP válido.");
    }
}

// Função para exibir o formulário de login
function showLogin() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');

    // Mostra o login, oculta o cadastro
    loginForm.classList.add('active');
    registerForm.classList.remove('active');

    // Atualiza os botões
    loginBtn.classList.add('active');
    registerBtn.classList.remove('active');
}

// Função para exibir o formulário de cadastro
function showRegister() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');



    // Mostra o cadastro, oculta o login
    registerForm.classList.add('active');
    loginForm.classList.remove('active');

    // Atualiza os botões
    registerBtn.classList.add('active');
    loginBtn.classList.remove('active');
}
