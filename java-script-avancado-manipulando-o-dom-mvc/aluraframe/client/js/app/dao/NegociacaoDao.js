class NegociacaoDao {

    constructor(connection) {

        this._connection = connection
        this._store = 'negociacoes'
    }

    adiciona(negociacao) {

        return new Promise((resolve, reject) => {


            let request = this._connection.transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(negociacao)

            request.onsuccess = e => {

                resolve()
            }

            request.onerror = e => {

                console.log(e.target.error)
                reject('Nao foi possivel persistir a negociacao')
            }
        })

    }

    listaTodos() {
        return new Promise((resolve, reject) => {

            let cursor = this._connection.transaction([this._store], 'readonly')
                .objectStore(this._store)
                .openCursor()

            cursor.onsuccess = e => {

                let posicaoAtual = e.target.result

                let listaDeNegociacoes = []

                if (posicaoAtual) {

                    let valorAtual = posicaoAtual.value

                    listaDeNegociacoes.push(new Negociacao(valorAtual._data, valorAtual._quantidade, valorAtual._valor))

                    posicaoAtual.continue()
                } else {

                    resolve(listaDeNegociacoes)
                }
            }

            cursor.onerror = e => {

                console.log(e.target.error)
                reject('Nao foi possivel localizar nenhuma negociacao no banco local')
            }
        })
    }
}