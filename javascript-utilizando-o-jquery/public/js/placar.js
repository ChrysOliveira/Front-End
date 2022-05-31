$('.botao-placar').click(exibePlacar);

function inserePlacar() {

    const corpoTabela = $('.placar').find('tbody');

    const numeroDePalavras = $('.contador-palavras').text();
    const usuario = 'Chrystian';

    const linha = criaLinha(usuario, numeroDePalavras);

    linha.find('.botao-remover').click(removeLinha);

    corpoTabela.prepend(linha);

    exibePlacar();

    scrollPlacar();
}

function scrollPlacar() {

    const posicaoPlacar = $('.placar').offset().top;

    $('body, html').animate({
        scrollTop: posicaoPlacar + "px"
    }, 1000)
}

function criaLinha(usuario, palavras) {

    const linha = $('<tr>');
    const nomeUsuario = $('<td>').text(usuario);
    const quantidadeDePalavrasDigitadas = $('<td>').text(palavras);
    const botaoRemover = $('<td>');
    const link = $('<a>').addClass('botao-remover').attr('href', '#');
    const icone = $('<i>').addClass('small').addClass('material-icons').addClass('icones').text('delete');

    link.append(icone);

    botaoRemover.append(link);

    linha.append(nomeUsuario);
    linha.append(quantidadeDePalavrasDigitadas);
    linha.append(botaoRemover);

    return linha;
}


function removeLinha() {

    event.preventDefault();

    const linha = $(this).parent().parent();

    linha.fadeOut(1000);

    setTimeout(() => linha.remove(), 1000);


};

function exibePlacar() {

    $('.placar').stop().slideToggle(1000);
    scrollPlacar();
}