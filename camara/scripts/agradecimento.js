const parametros = new URLSearchParams(window.location.search);

const campos = ["nome", "sobrenome", "email", "telefone", "organizacao"];

campos.forEach((campo) => {
    const elemento = document.querySelector(`#${campo}`);
    const valor = parametros.get(campo);

elemento.textContent = valor || "Não informado";

});

const dataHora = parametros.get("dataHora");
const elementoData = document.querySelector("#dataHora");

if (dataHora) {
    const data = new Date(dataHora);

elementoData.textContent = Number.isNaN(data.getTime())
    ? "Não informada"
    : data.toLocaleString("pt-BR");

} else {
    elementoData.textContent = "Não informada";
}