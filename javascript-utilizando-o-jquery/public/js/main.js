var tempoInicial = $('.tempo-digitacao').text();

function atualizaTamanhoFrase() {


    var frase = $('.frase').text();
    var quantidadePalavras = frase.split(' ').length;

    var tamanhoFrase = $('.tamanhoDaFrase');
    tamanhoFrase.text(quantidadePalavras);
}

var campoDigitacao = $('.campo-digitar');

function inicializaContadores() {

    campoDigitacao.on('input', () => {

        const textoDigitado = campoDigitacao.val();
        const quantidadeCaracteres = textoDigitado.length
        const quantidadePalavras = textoDigitado.split(/\S+/).length - 1

        $('.contador-caracteres').text(quantidadeCaracteres)
        $('.contador-palavras').text(quantidadePalavras)

    })
}

function inicializaCronometro() {

    campoDigitacao.one('focus', () => {
        var tempoRestante = $('.tempo-digitacao').text()

        const cronometroID = setInterval(() => {
                --tempoRestante;
                $('.tempo-digitacao').text(tempoRestante);

                if (tempoRestante <= 0) {

                    campoDigitacao.attr('disabled', true);

                    clearInterval(cronometroID)
                }
            },
            1000)
    })
}

campoDigitacao.one('focus', () => {

    const cronometroID = setInterval(() => {
            --tempoRestante;
            $('.tempo-digitacao').text(tempoRestante);

            if (tempoRestante <= 0) {

                campoDigitacao.attr('disabled', true);

                clearInterval(cronometroID)
            }
        },
        1000)
})

$('.botao-reiniciar').click(() => {

    $('.tempo-digitacao').text(tempoInicial);
    $('.campo-digitar').attr('disabled', false).val('');
    $('.contador-caracteres').text('0');
    $('.contador-palavras').text('0');
})