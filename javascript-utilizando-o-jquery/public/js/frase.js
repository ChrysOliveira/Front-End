$('.botao-frase').click(fraseAleatoria);

function fraseAleatoria() {

    $.get('http://localhost:3000/frases', trocaFraseAleatoria);
}

function trocaFraseAleatoria(data) {

    const numeroAleatorio = Math.floor(Math.random() * data.length);

    $('.frase').text(data[numeroAleatorio].texto);

    atualizaTamanhoFrase();

    atualizaTempoParaFrase(data[numeroAleatorio].tempo);
}