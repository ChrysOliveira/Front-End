import { View } from './View'
import { DateHelper } from '../helpers/DateHelper'
import { currentInstance } from '../controllers/NegociacaoController'


export class NegociacoesView extends View {

    constructor(elemento) {
        super(elemento)

        elemento.addEventListener('click', function(e) {

            if (e.target.nodeName == 'TH') {

                currentInstance().ordena(e.target.textContent.toLowerCase())
            }
        })
    }

    template(model) {
            return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th >DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>
    
            <tbody>
            ${model.negociacoes.map(n => {

                return `
                <tr>
                    <td>${DateHelper.dataParaTexto(n.data)}</td>
                    <td>${n.quantidade}</td>
                    <td>${n.valor}</td>
                    <td>${n.volume}</td>
                </tr>
                `
            }).join('')}

            </tbody>
    
            <tfoot>
                <td colspan= "3"></td>
                <td>${model.negociacoes.reduce((total, n) => total += n.volume, 0.0)}</td>
            </tfoot>
        </table>
        `
    }
}