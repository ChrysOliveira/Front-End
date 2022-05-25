import { ListaNegociacoes } from '../models/ListaNegociacoes'
import { Negociacao } from '../models/Negociacao'
import { Mensagem } from '../models/Mensagem'
import { NegociacoesView } from '../views/NegociacoesView'
import { MensagemView } from '../views/MensagemView'
import { NegociacaoService } from '../services/NegociacaoService'
import { DateHelper } from '../helpers/DateHelper'
import { Bind } from '../helpers/Bind'

class NegociacaoController {

    constructor() {

        this._ordemAtual = ''
        this._service = new NegociacaoService()

        let $ = document.querySelector.bind(document)

        this._inputData = $('#data')
        this._inputQuantidade = $('#quantidade')
        this._inputValor = $('#valor')

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem')

        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto')

        this._init()
    }

    _init() {

        this._service.lista()
            .then(negociacoes => {

                negociacoes.forEach(negociacao => {

                    this._listaNegociacoes.adiciona(negociacao)
                })
            })
            .catch(mensagem => this._mensagem.texto = mensagem)

        setInterval(() => {
            this.importaNegociacoes()
        }, 3000)
    }

    adiciona(event) {

        event.preventDefault()

        let negociacao = this._criaNegociacao()

        this._service
            .cadastra(negociacao)
            .then(mensagem => {

                this._listaNegociacoes.adiciona(negociacao)
                this._mensagem.texto = mensagem
                this._limpaFormulario()
            })
            .catch(mensagem => this._mensagem.texto = mensagem)


    }

    importaNegociacoes() {

        this._service.importaNegociacoesDasSemanas(this._listaNegociacoes.negociacoes)
            .then(negociacoes => negociacoes.forEach(negociacao => {

                this._listaNegociacoes.adiciona(negociacao)
                this._mensagem.texto = 'Negociacoes da semana importadas'
            }))
            .catch(erro => this._mensagem.texto = erro)
    }

    ordena(coluna) {
        if (this._ordemAtual == coluna) {

            this._listaNegociacoes.inverteOrdem()
        } else {

            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna])
        }
        this._ordemAtual = coluna
    }

    limpa(event) {

        event.preventDefault()

        this._service.limpa()
            .then(mensagem => {

                this._listaNegociacoes.esvazia()

                this._mensagem.texto = mensagem

                this._limpaFormulario()
            })
            .catch(mensagem => this._mensagem = mensagem)

    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        )
    }

    _limpaFormulario() {
        this._inputData.value = ''
        this._inputQuantidade.value = 1
        this._inputValor.value = 0.0

        this._inputData.focus()
    }
}

let negociacaoController = new NegociacaoController()

export function currentInstance() {

    return negociacaoController
}