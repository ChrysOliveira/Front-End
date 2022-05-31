$('.botao-frase').click(fraseAleatoria);
$('.botao-frase-id').click(buscaFrase);

function fraseAleatoria() {

    $('.spinner').toggle();

    $.get('http://localhost:3000/frases', trocaFraseAleatoria).fail(function() {

        const textoErro = $('.texto-erro');
        textoErro.fadeIn();

        setTimeout(() => textoErro.fadeOut(), 2000);
    }).always(() => $('.spinner').toggle());
}

function trocaFraseAleatoria(data) {

    const numeroAleatorio = Math.floor(Math.random() * data.length);

    $('.frase').text(data[numeroAleatorio].texto);

    atualizaTamanhoFrase();

    atualizaTempoParaFrase(data[numeroAleatorio].tempo);
}

function buscaFrase() {

    $('.spinner').toggle();

    const fraseId = $('#frase-id').val();

    const dados = {
        id: fraseId
    }

    $.get('http://localhost:3000/frases', dados, trocaFrase).fail(function() {

        const textoErro = $('.texto-erro');
        textoErro.fadeIn();

        setTimeout(() => textoErro.fadeOut(), 2000);
    }).always(() => $('.spinner').toggle());

}

function trocaFrase(data) {

    const frase = $('.frase')
    frase.text(data.text);

    atualizaTamanhoFrase();
    atualizaTempoParaFrase(data.tempo);

}