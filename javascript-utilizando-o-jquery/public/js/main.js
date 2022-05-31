var tempoInicial = $('.tempo-digitacao').text();
var campoDigitacao = $('.campo-digitar');
var botaoReiniciar = $('.botao-reiniciar');
var frase = $('.frase')

$( //essa linha eh a mesma coisa de $(document).ready(function::Function)
    () => {

        atualizaTamanhoFrase();
        inicializaContadores();
        inicializaCronometro();
        inicializaMarcadores();
        botaoReiniciar.click(reiniciarGame).attr('disabled', true);
    });

function atualizaTamanhoFrase() {

    const fraseTexto = frase.text()
    const quantidadePalavras = fraseTexto.split(' ').length;

    const tamanhoFrase = $('.tamanhoDaFrase');
    tamanhoFrase.text(quantidadePalavras);
}

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

        let tempoRestante = $('.tempo-digitacao').text()
        botaoReiniciar.attr('disabled', true);

        const cronometroID = setInterval(() => {
                --tempoRestante;
                $('.tempo-digitacao').text(tempoRestante);

                if (tempoRestante <= 0) {

                    clearInterval(cronometroID);
                    finalizaJogo();
                }
            },
            1000)
    })
}

function finalizaJogo() {

    campoDigitacao.attr('disabled', true);

    botaoReiniciar.attr('disabled', false)

    campoDigitacao.addClass('campo-desativado');

    inserePlacar();

}

function inicializaMarcadores() {

    campoDigitacao.on('input', () => {

        const fraseTexto = frase.text();

        const textoDigitando = campoDigitacao.val();

        const pedacoFraseComparar = fraseTexto.substr(0, textoDigitando.length);

        const valida = textoDigitando == pedacoFraseComparar; //poderia usar tambem: frase.startsWith(textoDigitando);

        campoDigitacao.toggleClass('borda-verde', valida);
        campoDigitacao.toggleClass('borda-vermelha', !valida);

    })
}

function reiniciarGame() {

    campoDigitacao.removeClass('campo-desativado');
    campoDigitacao.removeClass('borda-verde');
    campoDigitacao.removeClass('borda-vermelha');

    $('.tempo-digitacao').text(tempoInicial);
    $('.campo-digitar').attr('disabled', false).val('');
    $('.contador-caracteres').text('0');
    $('.contador-palavras').text('0');

    inicializaCronometro();
}