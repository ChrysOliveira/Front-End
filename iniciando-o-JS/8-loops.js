console.log(`Trabalhando com listas`);

const listaDeDestinos = new Array(
    `Salvador`,
    `Sao Paulo`,
    `Rio de Janeiro`
);

const idadeComprador = 21;
const estaAcompanhado = true;
let temPassagemComprada = false;
const destino = "Salvador";

console.log("\nDestinos possiveis:")
console.log(listaDeDestinos)

const podeComprar = idadeComprador >= 18 || estaAcompanhado;

let destinoExiste = false;
let contador = 0;
while (contador < 3) {
    if (listaDeDestinos[contador] == destino){
        console.log("Destino existe");
        destinoExiste = true;
        break;
    }
    contador++;
}

console.log(destinoExiste);

for (let i = 0; i < listaDeDestinos.length; i++) {
    if (listaDeDestinos[i] == destino){
        console.log("Destino existe");
        destinoExiste = true;
        break;
    }
}