import { currentInstance } from './controllers/NegociacaoController'
import {} from '../../node_modules/fetch-polyfill/fetch'

let negociacaoController = currentInstance()

document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController)
document.querySelector('[type=button]').onclick = negociacaoController.apaga.bind(negociacaoController)