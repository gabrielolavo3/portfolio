// DOM

const botaoMenu = document.querySelector('.menu-hamburguer');
const menu = document.querySelector('.menu-horizontal');
const iconeAtual = document.querySelector('.menu-icon');
const links = document.querySelectorAll('.menu-horizontal .nav-link');

// Guarda o HTML do ícone original
const iconeHamburguer = iconeAtual.outerHTML;

// Elementos do carrossel de projetos
const cardsProjeto = document.querySelectorAll('.card');
const dots = document.querySelectorAll('.dot');
const setaAnterior = document.querySelector('.seta-esquerda');
const setaProxima = document.querySelector('.seta-direita');

// Guarda o índice do card que está sendo exibido
let indiceAtual = 0;

const iconeFechar = `
    <svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
        <path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM231 231C240.4 221.6 255.6 221.6 264.9 231L319.9 286L374.9 231C384.3 221.6 399.5 221.6 408.8 231C418.1 240.4 418.2 255.6 408.8 264.9L353.8 319.9L408.8 374.9C418.2 384.3 418.2 399.5 408.8 408.8C399.4 418.1 384.2 418.2 374.9 408.8L319.9 353.8L264.9 408.8C255.5 418.2 240.3 418.2 231 408.8C221.7 399.4 221.6 384.2 231 374.9L286 319.9L231 264.9C221.6 255.5 221.6 240.3 231 231z"/>
    </svg>
`;

// EVENTOS DO MENU MOBILE

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

// EVENTOS DOS CARTÕES

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

            // Exibe somente o card correspondente ao índice atual
            card.classList.toggle('ativo', indice === indiceAtual);

        });

        // Percorre todos os indicadores
        dots.forEach((dot, indice) => {

            // Altera o indicador ativo conforme o card exibido
            dot.classList.toggle('ativo', indice === indiceAtual);

        });
    }
}

// Avança para o próximo projeto
function proximoProjeto() {

    // Incrementa o índice para avançar um card
    indiceAtual++;

    // Retorna ao primeiro card quando chegar ao final
    indiceAtual = indiceAtual % cardsProjeto.length;

    // Atualiza os cards e os indicadores
    atualizaNavegacao();

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

// EVENTO DE EMAIL

emailjs.init({
    publicKey: "JMwk92HBkwxRby7i7",
});

document.getElementById("form-contato").addEventListener("submit", function (event) {
    event.preventDefault() // Retira o comportamento de recarregar a página ao enviar

    const formData = {
        name: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("assunto").value,
        message: document.getElementById("mensagem").value,
    }

    //console.log(formData)

    const serviceID = "service_bmme4yy"
    const templateID = "template_7ttpy36"
    const submitButton = document.getElementById("enviar-btn")
    submitButton.textContent = "Enviando..."
    submitButton.disabled = true // Impossibilita clicar em sequência e enviar diversos e-mails

    emailjs.send(serviceID, templateID, formData)
        .then(() => {
            Toastify({
                text: "E-mail enviado com sucesso!",
                style: {
                    background: "#126396",
                    color: "#ffffff"
                }
            }).showToast();

            document.getElementById("form-contato").reset() // Limpar os dados escritos no formulário
        })
        .catch((error) => {
            Toastify({
                text: "Erro ao enviar o e-mail!",
                style: {
                    background: "#dc3545",
                    color: "#ffffff"
                }
            }).showToast();
        })
        .finally(() => {
            submitButton.textContent = "Enviar mensagem"
            submitButton.disabled = false
        })
})
