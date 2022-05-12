class NegociacaoService {

    obtemNegociacoesSemana(cb) {

        let xhr = new XMLHttpRequest()

        xhr.open('GET', 'negociacoes/semana')

        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    cb(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                }
            } else {
                console.log(xhr.responseText)
                cb('Nao foi possivel realizar a importacao', null)
            }
        }

        xhr.send()
    }

    obtemNegociacoesSemanaAnterior(cb) {

        let xhr = new XMLHttpRequest()

        xhr.open('GET', 'negociacoes/anterior')

        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    cb(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                }
            } else {
                console.log(xhr.responseText)
                cb('Nao foi possivel realizar a importacao', null)
            }
        }

        xhr.send()
    }

    obtemNegociacoesSemanaRetrasada(cb) {

        let xhr = new XMLHttpRequest()

        xhr.open('GET', 'negociacoes/retrasada')

        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    cb(null, JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)))
                }
            } else {
                console.log(xhr.responseText)
                cb('Nao foi possivel realizar a importacao', null)
            }
        }

        xhr.send()
    }
}