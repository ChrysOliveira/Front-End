export class View {

    constructor(elemento) {
        this._elemento = elemento
    }

    template(model) {
        throw new Error('O metodo template precisa ser sobrescrito')
    }

    update(model) {
        this._elemento.innerHTML = this.template(model)
    }
}