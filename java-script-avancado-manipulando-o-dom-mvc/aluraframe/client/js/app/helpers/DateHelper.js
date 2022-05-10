class DateHelper {

    constructor() {
        throw new Error('A classe DateHelper nao deve ser instanciada')
    }

    static textoParaData(texto) {

        // if (!/\d{4}-\d{2}-\d{2}/.test(data)) {
        //     throw new Error('a data deve ser passada no formado yyyy/mm/dd')
        // }
        return new Date(...texto.split('-').map((item, indice) => item - indice % 2))
    }

    static dataParaTexto(data) {

        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
    }
}