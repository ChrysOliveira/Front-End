import { Cliente } from "./Cliente.js";
import { Gerente } from "./Funcionarios/Gerente.js";
import { Diretor } from "./Funcionarios/Diretor.js";
import { SistemaAutenticacao } from "./SistemaAutenticacao.js";

const diretor = new Diretor("Chrystian", 10000, 12345678900);
diretor.cadastrarSenha("123456789")

const gerente = new Gerente("Bea", 5000, 32132132100);
gerente.cadastrarSenha("123")

const cliente = new Cliente("Igor", "15915915900", "1234");

const diretorEstaLogado =  SistemaAutenticacao.login(diretor, "123456789");
const gerenteEstaLogado =  SistemaAutenticacao.login(gerente, "123");
const clienteEstaLogado =  SistemaAutenticacao.login(cliente, "1234");

console.log(diretorEstaLogado);
console.log(gerenteEstaLogado);
console.log(clienteEstaLogado);