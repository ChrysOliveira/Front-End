import { Conta } from "./Conta.js";

export class ContaCorrente extends Conta{
    constructor(cliente, agencia){
        super(0, cliente, agencia);
    }

    sacar(valor) {
        const taxa = 1.1;
        return super._sacar(valor, taxa);
    }
}
