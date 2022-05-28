import { handleStatus } from "../utils/Promise-helpers.js";
import { partialize, compose, pipe } from "../utils/Operators.js";
import { Maybe } from "../utils/Maybe.js";

const API = 'http://localhost:3000/notas';

const getItensFromNotas = notasM => notasM.map(notas => notas.$flatMap(nota => nota.itens));
const filterItemsByCode = (code, itemsM) => itemsM.map(items => items.filter(item => item.codigo == code));
const sumItemsValue = itemsM => itemsM.map(items => items.reduce((soma, atual) => soma += atual.valor, 0));


export const notasService = {

    listAll() {

        return fetch(API)
            .then(handleStatus)
            .then(notas => Maybe.of(notas))
            .catch(err => {

                console.log(err);

                return Promise.reject('Nao foi possivel obter as notas fiscais')
            });
    },

    sumItems(code) {

        const filterItems = partialize(filterItemsByCode, code);

        const sumItems = compose(sumItemsValue, filterItems, getItensFromNotas);
        // const sumItems2 = pipe(getItensFromNotas, filterItems, sumItemsValue);


        return this.listAll()
            .then(sumItems)
            .then(result => result.getOrElse(0));
    }

}