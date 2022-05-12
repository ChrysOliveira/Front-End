class NegociacaoController {

    constructor() {

        let $ = document.querySelector.bind(document)

        this._inputData = $('#data')
        this._inputQuantidade = $('#quantidade')
        this._inputValor = $('#valor')

        this._negociacoesView = new NegociacoesView($('#negociacoesView'))

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), this._negociacoesView, 'adiciona', 'esvazia')

        this._mensagemView = new MensagemView($('#mensagemView'))

        this._mensagem = new Bind(new Mensagem(), this._mensagemView, 'texto')
    }

    adiciona(event) {

        event.preventDefault()

        this._listaNegociacoes.adiciona(this._criaNegociacao())

        this._mensagem.texto = 'Negociacao adicionada com sucesso'

        this._limpaFormulario()
    }

    importaNegociacoes(event) {

        event.preventDefault()

        let service = new NegociacaoService()

        service.obtemNegociacoesSemana((erro, resposta) => {

            if (erro) {
                this._mensagem.texto = 'Nao foi possivel imporatar as negociacoes'
                return
            }
            resposta.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))

            service.obtemNegociacoesSemanaAnterior((erro, resposta) => {

                if (erro) {
                    this._mensagem.texto = 'Nao foi possivel imporatar as negociacoes'
                    return
                }
                resposta.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))

                service.obtemNegociacoesSemanaRetrasada((erro, resposta) => {

                    if (erro) {
                        this._mensagem.texto = 'Nao foi possivel imporatar as negociacoes'
                        return
                    }
                    resposta.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao))
                    this._mensagem.texto = 'Negociacao adiciona com sucesso.'
                })
            })
        })


    }

    limpa(event) {

        event.preventDefault()

        this._listaNegociacoes.esvazia()

        this._mensagem.texto = 'Historico de negociacao apagada'

        this._limpaFormulario()
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        )
    }

    _limpaFormulario() {
        this._inputData.value = ''
        this._inputQuantidade.value = 1
        this._inputValor.value = 0.0

        this._inputData.focus()
    }
}