class NegociacaoService {

    constructor() {
        this._http = new HttpService()
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
}