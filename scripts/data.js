const anoAtual = document.querySelector("#ano-atual");
const ultimaModificacao = document.querySelector("#ultimaModificacao");

anoAtual.textContent = new Date().getFullYear();

ultimaModificacao.textContent =
    `Última modificação: ${document.lastModified}`;