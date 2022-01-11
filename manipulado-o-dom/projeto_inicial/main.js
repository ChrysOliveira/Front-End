import BotaoConclui from "./componentes/concluiTarefa.js";
import BotaoDeleta from "./componentes/deletaTarefa.js";

const criarTarefa = (evento) => {
    evento.preventDefault();

    const lista = document.querySelector('[data-list]');
    const input = document.querySelector('[data-form-input]');
    const valor = input.value;

    const novaTarefa = document.createElement('li');
    novaTarefa.classList.add('task');
    const conteudo = `<p class="content">${valor}</p>`;

    novaTarefa.innerHTML = conteudo;
    novaTarefa.appendChild(BotaoConclui());
    novaTarefa.appendChild(BotaoDeleta());
    lista.appendChild(novaTarefa);
    input.value = " ";
}

const novaTarefa = document.querySelector('[data-form-button]');

novaTarefa.addEventListener('click', criarTarefa);