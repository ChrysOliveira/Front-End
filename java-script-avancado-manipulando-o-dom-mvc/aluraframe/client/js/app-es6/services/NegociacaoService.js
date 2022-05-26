import { HttpService } from './HttpService'
import { ConnectionFactory } from './ConnectionFactory'
import { Negociacao } from '../models/Negociacao'
import { NegociacaoDao } from '../dao/NegociacaoDao'

export class NegociacaoService {

    constructor() {
        this._http = new HttpService()
    }

    importaNegociacoesDasSemanas(listaAtual) {

        return Promise.all([
                this.obtemNegociacoesSemana(),
                this.obtemNegociacoesSemanaAnterior(),
                this.obtemNegociacoesSemanaRetrasada()
            ])
            .then(listaDeNegociacoesDoPromise => listaDeNegociacoesDoPromise.reduce((achatado, atual) =>
                    achatado.concat(atual), [])
                .filter(negociacao => !listaAtual.some(negociacaoExistente => negociacao.equals(negociacaoExistente))))
            .catch(error => {

                console.log(error)
                throw new Error('Nao foi possivel importar as negociacoes')
            })
    }


    obtemNegociacoesSemana() {

        return new Promise((resolve, reject) => {

            this._http.get('negociacoes/semana')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                })
                .catch(erro => {
                    console.log(erro)
                    reject('Nao foi possivel obter as negociacoes da semana')
                })

        })
    }

    obtemNegociacoesSemanaAnterior() {

        return new Promise((resolve, reject) => {

            this._http.get('negociacoes/anterior')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                })
                .catch(erro => {
                    console.log(erro)
                    reject('Nao foi possivel obter as negociacoes da semana anterior')
                })

        })
    }

    obtemNegociacoesSemanaRetrasada() {

        return new Promise((resolve, reject) => {

            this._http.get('negociacoes/retrasada')
                .then(negociacoes => {
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                })
                .catch(erro => {
                    console.log(erro)
                    reject('Nao foi possivel obter as negociacoes da semana retrasada')
                })

        })
    }

    cadastra(negociacao) {

        return ConnectionFactory.getConnection()
            .then(conexao => new NegociacaoDao(conexao))
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negociacao adicionada com sucesso')
            .catch(() => {

                throw new Error('Nao foi possivel adicionar a negociacao')
            })
    }

    lista() {

        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .catch(erro => {

                console.log(erro)
                throw new Error('Nao foi possivel obter as negociacoes')
            })

    }

    limpa() {

        return ConnectionFactory.getConnection()
            .then(conexao => new NegociacaoDao(conexao))
            .then(dao => dao.limpaNegociacoes())
            .then(() => 'Negociacoes apagadas com sucesso')
            .catch(erro => {

                console.log(erro)
                throw new Error('Nao foi possivel limpar as negociacoes')
            })
    }


}