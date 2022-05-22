var ConnectionFactory = (
    function() {

        const dbName = 'aluraframe',
            dbVersion = 4,
            stores = ['negociacoes']

        let connection = null,
            close = null

        return class ConnectionFactory {

            static getConnection() {

                return new Promise((resolve, reject) => {

                    let openRequest = window.indexedDB.open(dbName, dbVersion)

                    openRequest.onupgradeneeded = e => {

                        console.log('Criando ou atualizando bd')

                        ConnectionFactory._criaStores(e.target.result)

                    }

                    openRequest.onsuccess = e => {

                        if (!connection) connection = e.target.result

                        close = connection.close.bind(connection) //estou passando o metodo close para a variavel close antes de altera-lo
                        connection.close = () => {

                            throw new Error('Voce nao deve encerrar a conexao diretamente')
                        }
                        resolve(connection)
                    }

                    openRequest.onerror = e => {

                        console.log(e.target.error)
                        reject(e.target.error.name)
                    }
                })
            }

            static _criaStores(connection) {

                stores.forEach(store => {

                    if (connection.objectStoreNames.contains(store))
                        connection.deleteObjectStore(store)

                    connection.createObjectStore(store, { autoIncrement: true })
                })
            }

            static closeConnection() {

                if (connection) {

                    close()
                    connection = null
                }
            }
        }
    }
)()