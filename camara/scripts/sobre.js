
import { lugares } from "../dados/lugares.mjs";

const listaLugares = document.querySelector("#lista-lugares");

lugares.forEach((lugar, indice) => {
    const cartao = document.createElement("article");
    cartao.classList.add("cartao-lugar");

    cartao.innerHTML = `
        <h2>${lugar.nombre}</h2>
        <figure>
            <img
                src="imagens/lugar-${indice + 1}.webp"
                alt="${lugar.nombre}"
                loading="${indice === 0 ? "eager" : "lazy"}"
                ${indice === 0 ? 'fetchpriority="high"' : ""}
                width="300"
                height="200"
            >
        </figure>
        <address>${lugar.direccion}</address>
        <p>${lugar.descripcion}</p>
        <button type="button">Saiba mais</button>
    `;

    listaLugares.appendChild(cartao);
});

const mensagemVisita = document.querySelector("#mensagem-visita");
const ultimaVisita = localStorage.getItem("ultimaVisita");
const agora = Date.now();

if (!ultimaVisita) {
    mensagemVisita.textContent =
        "Boas-vindas! Entre em contato conosco caso tenha alguma dúvida.";
} else {
    const dias = Math.floor(
        (agora - Number(ultimaVisita)) / (1000 * 60 * 60 * 24)
    );

    if (dias < 1) {
        mensagemVisita.textContent = "Já voltou? Que legal!";
    } else {
        const palavraDia = dias === 1 ? "dia" : "dias";
        mensagemVisita.textContent =
            `Seu último acesso foi há ${dias} ${palavraDia}.`;
    }
}

localStorage.setItem("ultimaVisita", agora);