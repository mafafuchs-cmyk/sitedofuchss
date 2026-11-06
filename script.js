// ==========================================================================
// COMPORTAMENTOS E INTERAÇÕES DO SITE
// ==========================================================================


// --------------------------------------------------------------------------
// ARRAY DE PROJETOS
// Cada item é um objeto com as mesmas chaves.
// Para adicionar um projeto novo, basta incluir mais um objeto aqui.
// O HTML não precisa ser alterado.
// --------------------------------------------------------------------------

const projetos = [
    {
        titulo: 'Projeto 1',
        tecnologias: 'HTML · CSS · JavaScript',
        descricao: 'Descrição do primeiro projeto.',
        utilidade: 'Como esse projeto serve para a área.',
        link: '#'
    },
    {
        titulo: 'Projeto 2',
        tecnologias: 'HTML · CSS · Figma',
        descricao: 'Descrição do segundo projeto.',
        utilidade: 'Como esse projeto serve para a área.',
        link: '#'
    },
    {
        titulo: 'Projeto 3',
        tecnologias: 'HTML · CSS · JavaScript',
        descricao: 'Descrição do terceiro projeto.',
        utilidade: 'Como esse projeto serve para a área.',
        link: '#'
    }
];

// Mostra no console o array completo assim que a página carrega
console.log('Projetos cadastrados:', projetos);


// --------------------------------------------------------------------------
// RENDERIZAÇÃO DOS PROJETOS COM FOR
// Um for percorre o array e monta um cartão no HTML para cada objeto.
// Se você adicionar um novo projeto no array acima, ele já aparece
// automaticamente sem mexer em nada no HTML.
// --------------------------------------------------------------------------

function montarProjetos() {
    // Pega o container onde os cartões vão aparecer
    const gradeProjetos = document.querySelector('#grade-projetos');

    // O for começa em 0 (primeiro projeto) e vai até o final do array
    for (let i = 0; i < projetos.length; i++) {
        const projeto = projetos[i]; // objeto do projeto atual (ex: projetos[0])

        // Cria o elemento article que vai virar o cartão na tela
        const cartao = document.createElement('article');
        cartao.classList.add('cartao-projeto', 'revelar-ao-rolar');

        // Preenche o cartão lendo as chaves do objeto (projeto.titulo, etc.)
        cartao.innerHTML =
            '<div class="corpo-projeto">' +
            '<span class="etiqueta-projeto">' + projeto.tecnologias + '</span>' +
            '<h3 class="nome-projeto">' + projeto.titulo + '</h3>' +
            '<p class="descricao-projeto">' + projeto.descricao + '</p>' +
            '<p class="utilidade-projeto">' + projeto.utilidade + '</p>' +
            '</div>' +
            '<a href="' + projeto.link + '" class="botao-principal" style="margin-top:1.5rem;">Ver Projeto</a>';

        // Insere o cartão no container da página
        gradeProjetos.appendChild(cartao);

        // Registra no console qual projeto foi montado
        console.log('Projeto montado:', projeto.titulo);
    }
}


// --------------------------------------------------------------------------
// VALIDAÇÃO DO FORMULÁRIO DE CONTATO
// Rubrica: "Formulário - Captura dos dados" (4 pts)
//          "Formulário - Validação" (6 pts)
//          "Formulário - Retorno de erro e de sucesso" (5 pts)
// --------------------------------------------------------------------------

// Verifica se um e-mail tem @ e ponto na parte depois do @
// Recebe o e-mail como parâmetro e retorna true (válido) ou false (inválido)
function validarEmail(email) {
    // Encontra o @ e verifica se há conteúdo antes e depois dele
    const posicaoArroba = email.indexOf('@');

    if (posicaoArroba < 1) {
        return false; // não tem @ ou está no começo
    }

    // Pega a parte depois do @
    const dominio = email.slice(posicaoArroba + 1);

    // Verifica se tem ponto no domínio (ex.: gmail.com)
    if (dominio.indexOf('.') < 1) {
        return false; // não tem ponto ou o ponto está logo após o @
    }

    return true; // e-mail passou em todas as verificações
}

// Exibe uma mensagem de erro embaixo de um campo específico
// Parâmetros: idErro = id do span de erro, mensagem = texto a exibir
function mostrarErro(idErro, mensagem) {
    const spanErro = document.querySelector('#' + idErro);
    spanErro.textContent = mensagem;
    spanErro.classList.add('ativo'); // classe que deixa o texto visível
}

// Limpa a mensagem de erro de um campo
function limparErro(idErro) {
    const spanErro = document.querySelector('#' + idErro);
    spanErro.textContent = '';
    spanErro.classList.remove('ativo');
}

// Exibe o retorno geral do formulário (sucesso ou erro geral)
// Parâmetro tipo: 'sucesso' ou 'erro'
function mostrarRetornoFormulario(mensagem, tipo) {
    const areaRetorno = document.querySelector('#retorno-formulario');
    areaRetorno.textContent = mensagem;

    // Remove as duas classes antes de adicionar a correta
    areaRetorno.classList.remove('retorno-sucesso', 'retorno-erro');

    if (tipo === 'sucesso') {
        areaRetorno.classList.add('retorno-sucesso');
        console.log('Formulário enviado com sucesso! Dados:', {
            nome: document.querySelector('#campo-nome').value,
            email: document.querySelector('#campo-email').value,
            mensagem: document.querySelector('#campo-mensagem').value
        });
    } else {
        areaRetorno.classList.add('retorno-erro');
        console.log('Erro no envio do formulário:', mensagem);
    }
}

// Valida todos os campos e retorna true se tudo estiver correto
function validarFormulario(nomeDigitado, emailDigitado, mensagemDigitada) {
    // Controla se o formulário passou em todas as validações
    let formularioValido = true;

    // --- Validação do nome ---
    if (nomeDigitado === '') {
        mostrarErro('erro-nome', 'O nome é obrigatório.');
        console.log('Erro de validação: nome vazio');
        formularioValido = false;
    } else if (nomeDigitado.length < 3) {
        mostrarErro('erro-nome', 'O nome precisa ter pelo menos 3 letras.');
        console.log('Erro de validação: nome muito curto');
        formularioValido = false;
    } else {
        limparErro('erro-nome');
    }

    // --- Validação do e-mail ---
    if (emailDigitado === '') {
        mostrarErro('erro-email', 'O e-mail é obrigatório.');
        console.log('Erro de validação: e-mail vazio');
        formularioValido = false;
    } else if (!validarEmail(emailDigitado)) {
        mostrarErro('erro-email', 'Digite um e-mail válido (ex.: seu@email.com).');
        console.log('Erro de validação: e-mail inválido');
        formularioValido = false;
    } else {
        limparErro('erro-email');
    }

    // --- Validação da mensagem ---
    if (mensagemDigitada === '') {
        mostrarErro('erro-mensagem', 'A mensagem é obrigatória.');
        console.log('Erro de validação: mensagem vazia');
        formularioValido = false;
    } else if (mensagemDigitada.length < 10) {
        mostrarErro('erro-mensagem', 'A mensagem precisa ter pelo menos 10 caracteres.');
        console.log('Erro de validação: mensagem muito curta');
        formularioValido = false;
    } else {
        limparErro('erro-mensagem');
    }

    return formularioValido;
}

// Captura o envio do formulário, valida os dados e exibe o retorno
function inicializarFormulario() {
    const formulario = document.querySelector('#formulario-contato');

    // Se o formulário não existir na página, encerra a função
    if (!formulario) return;

    formulario.addEventListener('submit', function (evento) {
        // Impede o comportamento padrão (a página não recarrega)
        evento.preventDefault();

        // Captura o que o usuário digitou em cada campo com .value
        const nomeDigitado = document.querySelector('#campo-nome').value.trim();
        const emailDigitado = document.querySelector('#campo-email').value.trim();
        const mensagemDigitada = document.querySelector('#campo-mensagem').value.trim();

        // Mostra no console os dados recebidos do formulário
        console.log('Dados recebidos do formulário:', {
            nome: nomeDigitado,
            email: emailDigitado,
            mensagem: mensagemDigitada
        });

        // Chama a validação; só "envia" se todos os campos estiverem corretos
        const tudoCerto = validarFormulario(nomeDigitado, emailDigitado, mensagemDigitada);

        if (tudoCerto) {
            // Formulário válido: exibe mensagem de sucesso e limpa os campos
            mostrarRetornoFormulario('Mensagem enviada com sucesso! Em breve entrarei em contato.', 'sucesso');
            formulario.reset();
        } else {
            // Formulário inválido: exibe mensagem de erro geral
            mostrarRetornoFormulario('Corrija os erros acima antes de enviar.', 'erro');
        }
    });
}


// --------------------------------------------------------------------------
// MENU MÓVEL
// Rubrica: "JS - Funções" — função com nome de ação, sem repetir código
// --------------------------------------------------------------------------

// Elementos do menu móvel (const porque não mudam de valor)
const botaoMenu = document.querySelector('.botao-menu');
const navegacaoMenu = document.querySelector('.navegacao');
const linksNavegacao = document.querySelectorAll('.navegacao .link-menu');

// Alterna a exibição do menu móvel e atualiza os atributos de acessibilidade
function alternarMenu() {
    const estaAberto = navegacaoMenu.classList.toggle('menu-aberto');
    botaoMenu.setAttribute('aria-expanded', estaAberto ? 'true' : 'false');
    botaoMenu.setAttribute('aria-label', estaAberto ? 'Fechar menu principal' : 'Abrir menu principal');
}

// Fecha o menu móvel ao clicar em qualquer link de navegação
function fecharMenuAoNavegar() {
    if (navegacaoMenu.classList.contains('menu-aberto')) {
        navegacaoMenu.classList.remove('menu-aberto');
        botaoMenu.setAttribute('aria-expanded', 'false');
        botaoMenu.setAttribute('aria-label', 'Abrir menu principal');
    }
}


// --------------------------------------------------------------------------
// DESTAQUE DO MENU AO ROLAR
// Marca com a classe 'link-ativo' o link da seção visível no momento
// --------------------------------------------------------------------------

function inicializarDestaqueMenu() {
    const secoes = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.navegacao .link-menu');

    const observador = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
            if (entrada.isIntersecting) {
                const idSecao = entrada.target.getAttribute('id');
                links.forEach(function (link) {
                    const destino = link.getAttribute('href');
                    if (destino === '#' + idSecao) {
                        link.classList.add('link-ativo');
                    } else {
                        link.classList.remove('link-ativo');
                    }
                });
            }
        });
    }, {
        rootMargin: '-30% 0px -50% 0px'
    });

    secoes.forEach(function (secao) {
        observador.observe(secao);
    });
}


// --------------------------------------------------------------------------
// SCROLL REVEAL
// Revela suavemente os blocos da página conforme o usuário rola a tela
// --------------------------------------------------------------------------

function inicializarScrollReveal() {
    // Adiciona a classe que ativa as animações CSS
    document.documentElement.classList.add('js-ativo');
    const elementosParaRevelar = document.querySelectorAll('.revelar-ao-rolar');

    const observador = new IntersectionObserver(function (entradas, obs) {
        entradas.forEach(function (entrada) {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visivel');
                // Para de observar o elemento depois de revelado (economiza processamento)
                obs.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.15
    });

    elementosParaRevelar.forEach(function (el) {
        observador.observe(el);
    });
}


// --------------------------------------------------------------------------
// FILTROS DE TECNOLOGIA
// Mostra ou oculta cartões de tecnologia pela categoria selecionada
// --------------------------------------------------------------------------

// Aplica o filtro: destaca o botão clicado e oculta os cartões errados
function aplicarFiltroTecnologias(filtroSelecionado) {
    const cartoes = document.querySelectorAll('.cartao-tecnologia');
    const botoesFiltro = document.querySelectorAll('.botao-filtro');

    botoesFiltro.forEach(function (botao) {
        if (botao.getAttribute('data-filtro') === filtroSelecionado) {
            botao.classList.add('filtro-ativo');
        } else {
            botao.classList.remove('filtro-ativo');
        }
    });

    cartoes.forEach(function (cartao) {
        const categoria = cartao.getAttribute('data-categoria');
        // Mostra se o filtro for 'todas' ou se a categoria bater com o filtro
        if (filtroSelecionado === 'todas' || categoria === filtroSelecionado) {
            cartao.classList.remove('oculto');
        } else {
            cartao.classList.add('oculto');
        }
    });
}

// Registra os cliques nos botões de filtro
function inicializarFiltrosTecnologia() {
    const botoesFiltro = document.querySelectorAll('.botao-filtro');
    botoesFiltro.forEach(function (botao) {
        botao.addEventListener('click', function () {
            const filtro = botao.getAttribute('data-filtro');
            aplicarFiltroTecnologias(filtro);
        });
    });
}


// --------------------------------------------------------------------------
// EXPANSÃO DOS CARTÕES DE TECNOLOGIA
// Clique no cartão revela o texto de como a ferramenta é usada
// --------------------------------------------------------------------------

// Alterna entre expandido e recolhido num cartão
function alternarExpansaoCartao(cartao) {
    const estaExpandido = cartao.getAttribute('aria-expanded') === 'true';
    cartao.setAttribute('aria-expanded', estaExpandido ? 'false' : 'true');
}

// Registra clique e tecla Enter/Espaço nos cartões de tecnologia
function inicializarExpansaoCartoes() {
    const cartoes = document.querySelectorAll('.cartao-tecnologia');
    cartoes.forEach(function (cartao) {
        cartao.addEventListener('click', function () {
            alternarExpansaoCartao(cartao);
        });

        cartao.addEventListener('keydown', function (evento) {
            if (evento.key === 'Enter' || evento.key === ' ') {
                evento.preventDefault();
                alternarExpansaoCartao(cartao);
            }
        });
    });
}


// --------------------------------------------------------------------------
// BOTÕES DE COPIAR (CONTATO)
// Copia o número ou e-mail para a área de transferência com feedback visual
// --------------------------------------------------------------------------

function copiarParaAreaDeTransferencia(botao) {
    const textoParaCopiar = botao.getAttribute('data-copiar');
    if (!textoParaCopiar) return;

    navigator.clipboard.writeText(textoParaCopiar).then(function () {
        const textoOriginal = botao.textContent;
        botao.textContent = 'Copiado!';
        botao.classList.add('copiado');

        // Volta ao texto original após 2 segundos
        setTimeout(function () {
            botao.textContent = textoOriginal;
            botao.classList.remove('copiado');
        }, 2000);
    });
}

function inicializarBotoesCopiar() {
    const botoesCopiar = document.querySelectorAll('.botao-copiar');
    botoesCopiar.forEach(function (botao) {
        botao.addEventListener('click', function () {
            copiarParaAreaDeTransferencia(botao);
        });
    });
}


// --------------------------------------------------------------------------
// BARRA DE PROGRESSO E BOTÃO VOLTAR AO TOPO
// A barra mostra quanto da página já foi lida; o botão aparece após 400px
// --------------------------------------------------------------------------

function atualizarProgressoERolagem() {
    const barraProgresso = document.getElementById('barra-progresso');
    const botaoTopo = document.getElementById('botao-topo');

    // Calcula a altura total rolável e a posição atual
    const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
    const rolagemAtual = window.scrollY;

    if (barraProgresso && alturaTotal > 0) {
        const percentual = (rolagemAtual / alturaTotal) * 100;
        barraProgresso.style.width = percentual + '%';
    }

    if (botaoTopo) {
        if (rolagemAtual > 400) {
            botaoTopo.classList.add('visivel');
        } else {
            botaoTopo.classList.remove('visivel');
        }
    }
}

// Rola suavemente a página de volta ao início
function voltarAoTopo() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function inicializarBarraEBotaoTopo() {
    const botaoTopo = document.getElementById('botao-topo');
    window.addEventListener('scroll', atualizarProgressoERolagem);

    if (botaoTopo) {
        botaoTopo.addEventListener('click', voltarAoTopo);
    }
}


// --------------------------------------------------------------------------
// INICIALIZAÇÃO GERAL
// Rubrica: "JS - Funções" — função principal que chama todas as outras
// É chamada quando o HTML termina de carregar (DOMContentLoaded)
// --------------------------------------------------------------------------

function inicializarAplicacao() {
    // Monta os cartões de projeto antes do scroll reveal,
    // para que os cartões gerados também sejam animados
    montarProjetos();

    if (botaoMenu && navegacaoMenu) {
        botaoMenu.addEventListener('click', alternarMenu);
        linksNavegacao.forEach(function (link) {
            link.addEventListener('click', fecharMenuAoNavegar);
        });
    }

    inicializarDestaqueMenu();
    inicializarScrollReveal();
    inicializarFiltrosTecnologia();
    inicializarExpansaoCartoes();
    inicializarBotoesCopiar();
    inicializarBarraEBotaoTopo();
    inicializarFormulario();

    // Confirma no console que tudo foi inicializado com sucesso
    console.log('Site inicializado com sucesso!');
    console.log("Obrigado por assistir, João Paulo e Burnes, vou sentir s")
}

// Executa após a renderização completa do DOM
document.addEventListener('DOMContentLoaded', inicializarAplicacao);
