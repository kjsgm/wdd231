const botaoMenu = document.querySelector("#menu");
const navegacao = document.querySelector("nav ul");

botaoMenu.addEventListener("click", () => {
    navegacao.classList.toggle("aberto");
});

// Ano atual do copyright
document.querySelector("#ano").textContent = new Date().getFullYear();

// Data da última modificação
document.querySelector("#modificado").textContent = document.lastModified;