$('.botao-frase').click(fraseAleatoria);

function fraseAleatoria() {

    console.log($.get('http://localhost:3000/frases', trocaFraseAleatoria));
}

function trocaFraseAleatoria(data) {

    const numeroAleatorio = Math.floor(Math.random() * data.length);

    $('.frase').text(data[numeroAleatorio].texto);

    atualizaTamanhoFrase();
}