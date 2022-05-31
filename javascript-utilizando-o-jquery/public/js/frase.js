$('.botao-frase').click(fraseAleatoria);

function fraseAleatoria() {

<<<<<<< HEAD
    $.get('http://localhost:3000/frases', trocaFraseAleatoria);
=======
    console.log($.get('http://localhost:3000/frases', trocaFraseAleatoria));
>>>>>>> b62b986dc402567d508f898af886aeccdcb2b67c
}

function trocaFraseAleatoria(data) {

    const numeroAleatorio = Math.floor(Math.random() * data.length);

    $('.frase').text(data[numeroAleatorio].texto);

    atualizaTamanhoFrase();
<<<<<<< HEAD

    atualizaTempoParaFrase(data[numeroAleatorio].tempo);
=======
>>>>>>> b62b986dc402567d508f898af886aeccdcb2b67c
}