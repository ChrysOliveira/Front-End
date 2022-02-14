console.log(`Trabalhando com listas`);

const listaDeDestinos = new Array(
    `Salvador`,
    `Sao Paulo`,
    `Rio de Janeiro`
);

const idadeComprador = 21;
const estaAcompanhado = true;
console.log("Destinos possiveis:")
console.log(listaDeDestinos)

if (idadeComprador >= 18 || estaAcompanhado) {
    listaDeDestinos.splice(1, 1); // removendo item
} else {
    console.log("comprador nao e maior de idade")
}

console.log(listaDeDestinos);