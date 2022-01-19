const listaClientes = () => {
    // TRABALHANDO COM PROMISES

    // const promise = new Promise((resolve, reject) => {
    //     const http = new XMLHttpRequest()

    //     http.open('GET', 'http://localhost:3000/profile')

    //     http.onload = () => {
    //         if (http.status >= 400) {
    //             reject(JSON.parse(http.response))
    //         } else {
    //             resolve(JSON.parse(http.response))
    //         }
    //     }
    //     http.send()
    // })
    // console.log(promise)

    // return promise

    return fetch(`http://localhost:3000/profile`)
        .then(resposta => {
            if (resposta.ok) {
                return resposta.json()
            }
            throw new Error('Nao foi possivel listar os clientes')
        })
}

const criaCliente = (nome, email) => {
    return fetch(`http://localhost:3000/profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                email: email
            })
        })
        .then(resposta => {
            if (resposta.ok) {
                return resposta.body
            }
            throw new Error('Nao foi possivel criar um clientes')
        })
}

const removeCliente = (id) => {
    return fetch(`http://localhost:3000/profile/${id}`, {
        method: 'DELETE'
    }).then(resposta => {
        if (!resposta.ok) {
            throw new Error('Nao foi possivel remover um cliente clientes')
        }
    })
}

const detalhaCliente = (id) => {
    return fetch(`http://localhost:3000/profile/${id}`)
        .then(resposta => {
            if (resposta.ok) {
                return resposta.json()
            }
            throw new Error('Nao foi possivel detalhar o cliente clientes')

        })
}

const atualizaCliente = (id, nome, email) => {
    return fetch(`http://localhost:3000/profile/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                email: email
            })
        })
        .then(resposta => {
            if (resposta.ok) {
                return resposta.json()
            }
            throw new Error('Nao foi possivel atualizar o cliente clientes')

        })
}


export const clienteService = {
    listaClientes,
    criaCliente,
    removeCliente,
    detalhaCliente,
    atualizaCliente
}