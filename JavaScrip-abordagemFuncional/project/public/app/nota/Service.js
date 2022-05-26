import { handleStatus } from "../utils/Promise-helpers.js";

const API = 'http://localhost:3000/notas';

const sumItems = code => notas => notas
    .$flatMap(nota => nota.itens)
    .filter(item => item.codigo == code)
    .reduce((soma, atual) => soma += atual.valor, 0);

export const notasService = {

    listAll() {

        return fetch(API).then(handleStatus).catch(err => {

            console.log(err);

            return Promise.reject('Nao foi possivel obter as notas fiscais')
        });
    },

    sumItems(code) {
        return this.listAll().then(sumItems(code))

    }

}