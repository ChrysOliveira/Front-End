$('.botao-placar').click(exibePlacar);
$('.botao-sync').click(sincronizaPlacar);

function inserePlacar() {

    const corpoTabela = $('.placar').find('tbody');

    const numeroDePalavras = $('.contador-palavras').text();
    const usuario = $('#usuarios').val();

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

function sincronizaPlacar() {
    const placar = [];

    const linhas = $('tbody>tr');

    linhas.each(function() {

        const usuario = $(this).find('td:nth-child(1)').text();
        const palavras = $(this).find('td:nth-child(2)').text();

        var score = {
            usuario: usuario,
            pontos: palavras
        };

        placar.push(score);
    })

    const dados = {
        placar: placar
    }

    $.post('http://localhost:3000/placar', dados, () => {

        console.log('salvou os dados no servidor')

        $('.tooltip').tooltipster('open').tooltipster('content', 'Sucesso ao sync');
    }).fail(() => {
        $('.tooltip').tooltipster('open').tooltipster('content', 'Falha ao sync');
    })

    .always(() => {

        setTimeout(() => $('.tooltip').tooltipster('close'), 1000);
    });

}

function atualizaPlacar() {

    $.get('http://localhost:3000/placar', function(data) {

        $(data).each(function() {

            var linha = criaLinha(this.usuario, this.pontos);
            linha.find('.botao-remover').click(removeLinha);
            $('tbody').appen(linha);
        })
    })
}