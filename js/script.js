// DOM

// Menu mobile
const botaoMenu = document.querySelector('.menu-hamburguer');
const menu = document.querySelector('.menu-horizontal');
const iconeAtual = document.querySelector('.menu-icon');
const links = document.querySelectorAll('.menu-horizontal .nav-link');

// Carrossel de projetos
const cardsProjeto = document.querySelectorAll('.card');
const dots = document.querySelectorAll('.dot');
const setaAnterior = document.querySelector('.seta-esquerda');
const setaProxima = document.querySelector('.seta-direita');

// Modo escuro e claro
const temaBtn = document.querySelector('.modo-escuro-claro');

// Formulário
const formulario = document.getElementById('form-contato')
const assunto = document.getElementById('assunto')
const nome = document.getElementById('nome')
const email = document.getElementById('email')
const mensagem = document.getElementById('mensagem')
const submitButton = document.getElementById('enviar-btn')


const iconeHamburguer = iconeAtual.outerHTML; // Guarda o HTML do ícone original
let indiceAtual = 0; // Guarda o índice do card que está sendo exibido
let darkmode = localStorage.getItem('darkmode'); // Recupera a preferência de tema salva


/* Modo Escuro e Claro */

// Ativa o modo escuro
const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    document.body.style.backgroundColor = "#222222";

    localStorage.setItem('darkmode', 'active');
}

// Desativa o modo escuro
const disableDarkmode = () => {
    document.body.classList.remove('darkmode');
    document.body.style.backgroundColor = "#e6e8ea";

    localStorage.setItem('darkmode', null);
}

// Verifica se existe uma preferência salva
if (darkmode === "active") {
    enableDarkmode();
}

// Alterna entre os temas ao clicar
temaBtn.addEventListener('click', () => {
    darkmode = localStorage.getItem('darkmode');

    darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});


/* Menu Mobile (Phone and Tablet) */

// Ícone utilizado para fechar o menu
const iconeFechar = `
    <svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
        <path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM231 231C240.4 221.6 255.6 221.6 264.9 231L319.9 286L374.9 231C384.3 221.6 399.5 221.6 408.8 231C418.1 240.4 418.2 255.6 408.8 264.9L353.8 319.9L408.8 374.9C418.2 384.3 418.2 399.5 408.8 408.8C399.4 418.1 384.2 418.2 374.9 408.8L319.9 353.8L264.9 408.8C255.5 418.2 240.3 418.2 231 408.8C221.7 399.4 221.6 384.2 231 374.9L286 319.9L231 264.9C221.6 255.5 221.6 240.3 231 231z"/>
    </svg>
`;

// Abre o menu de navegação
function abrirMenu() {
    menu.classList.add('ativo');
    botaoMenu.innerHTML = iconeFechar;
}

// Fecha o menu de navegação
function fecharMenu() {
    menu.classList.remove('ativo');
    botaoMenu.innerHTML = iconeHamburguer;
}

// Verifica se o menu está aberto ou fechado ao clicar
botaoMenu.addEventListener('click', function () {
    if (menu.classList.contains('ativo')) {
        fecharMenu();
    }
    else {
        abrirMenu();
    }
});

// Fecha o menu quando um link é selecionado
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function () {
        fecharMenu();
    });
}


/* Carrosel de Projetos*/

// Verifica se a resolução é de tablet ou celular
function dispositivoResolucao() {
    return window.innerWidth <= 1100;
}

// Atualiza os cards e os indicadores
function atualizaNavegacao() {

    // Executa a navegação somente em telas menores
    if (dispositivoResolucao()) {

        // Percorre todos os cards
        cardsProjeto.forEach((card, indice) => {            
            card.classList.toggle('ativo', indice === indiceAtual); // Exibe somente o card correspondente ao índice atual

        });

        // Percorre todos os indicadores
        dots.forEach((dot, indice) => {            
            dot.classList.toggle('ativo', indice === indiceAtual); // Altera o indicador ativo conforme o card exibido

        });
    }
}

// Avança para o próximo projeto
function proximoProjeto() {
    indiceAtual++; // Incrementa o índice para avançar um card
    indiceAtual = indiceAtual % cardsProjeto.length; // Retorna ao primeiro card quando chegar ao final
    atualizaNavegacao(); // Atualiza os cards e os indicadores
}

// Volta para o projeto anterior
function projetoAnterior() {

    // Decrementa o índice para voltar um card
    indiceAtual--;

    // Se estiver no primeiro card, vai para o último
    if (indiceAtual < 0) {
        indiceAtual = cardsProjeto.length - 1;
    }

    // Atualiza os cards e os indicadores
    atualizaNavegacao();
}

// Avança um projeto ao clicar na seta direita
setaProxima.addEventListener('click', proximoProjeto);

// Volta um projeto ao clicar na seta esquerda
setaAnterior.addEventListener('click', projetoAnterior);

// Atualiza a navegação quando a largura da tela muda
window.addEventListener('resize', atualizaNavegacao);

// Executa a função assim que o JavaScript é carregado
atualizaNavegacao();


/* Formulário e EmailJS*/

// Inicializa o EmailJS
emailjs.init({
    publicKey: "JMwk92HBkwxRby7i7",
});

// FUNÇÕES DE VALIDAÇÃO

function exibirErro(campo, elementoErro, texto) {
    elementoErro.textContent = texto
    campo.classList.add('invalido')
    campo.classList.remove('valido')
}

function removerErro(campo, elementoErro) {
    elementoErro.textContent = ''
    campo.classList.remove('invalido')
    campo.classList.add('valido')
}

function validacaoAssunto() {
    const erro = document.getElementById('erro-assunto')
    const minLength = assunto.getAttribute('minlength')

    if (assunto.value.trim().length < minLength) {
        exibirErro(assunto, erro,`O assunto precisa ter pelo menos ${minLength} caracteres`)
        return false
    }

    removerErro(assunto, erro)
    return true
}

function validacaoNome() {
    const erro = document.getElementById('erro-nome')
    const minLength = nome.getAttribute('minlength')

    if (nome.value.trim().length < minLength) {
        exibirErro(nome, erro, `O nome precisa ter pelo menos ${minLength} caracteres`)
        return false
    }

    removerErro(nome, erro)
    return true
}

function validarEmail() {
    const erro = document.getElementById('erro-email')

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!regexEmail.test(email.value.trim())) {
        exibirErro(email, erro, 'Endereço de e-mail inválido')
        return false
    }

    removerErro(email, erro)
    return true
}

function validarMensagem() {
    const erro = document.getElementById('erro-mensagem')
    const minLength = mensagem.getAttribute('minlength')

    if (mensagem.value.trim().length < minLength) {
        exibirErro(mensagem, erro, `A mensagem precisa ter pelo menos ${minLength} caracteres`)
        return false
    }

    removerErro(mensagem, erro)
    return true
}

// Validação enquanto digita
assunto.addEventListener('input', validacaoAssunto)
nome.addEventListener('input', validacaoNome)
email.addEventListener('input', validarEmail)
mensagem.addEventListener('input', validarMensagem)

formulario.addEventListener('submit', function (event) {

    // Impede o recarregamento da página
    event.preventDefault()

    // Executa as validações
    const nomeAprovado = validacaoNome()
    const assuntoAprovado = validacaoAssunto()
    const emailAprovado = validarEmail()
    const mensagemAprovada = validarMensagem()

    // Interrompe o envio caso exista algum erro
    if (!nomeAprovado || !assuntoAprovado || !emailAprovado || !mensagemAprovada) {
        return
    }

    // Armazena os dados do formulário
    const formData = {
        name: nome.value,
        email: email.value,
        subject: assunto.value,
        message: mensagem.value,
    }

    const serviceID = "service_bmme4yy"
    const templateID = "template_7ttpy36"

    // Altera o botão durante o envio
    submitButton.textContent = "Enviando..."
    submitButton.disabled = true

    // Envia o e-mail utilizando o EmailJS
    emailjs.send(serviceID, templateID, formData)
        .then(() => {
            Toastify({
                text: "E-mail enviado com sucesso!",
                style: {
                    background: "#126396",
                    color: "#ffffff"
                }
            }).showToast()
            
            formulario.reset() // Limpa os campos

            // Remove as classes de validação
            document.querySelectorAll('.valido').forEach(campo => {
                campo.classList.remove('valido')
            })

        })
        .catch((error) => {
            console.error("Erro ao enviar e-mail:", error)
            Toastify({
                text: "Erro ao enviar o e-mail!",
                style: {
                    background: "#dc3545",
                    color: "#ffffff"
                }
            }).showToast()

        })
        .finally(() => {
            // Restaura o botão após o envio
            submitButton.textContent = "Enviar mensagem"
            submitButton.disabled = false
        })
})
