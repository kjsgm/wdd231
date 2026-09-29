// =================================
// MEMBROS DA CÂMARA - WDD 231
// Katherine Montanhaur
// =================================

const areaMembros = document.querySelector("#membros");
const botaoGrade = document.querySelector("#grade");
const botaoLista = document.querySelector("#lista");

// Busca os dados dos membros no arquivo JSON
async function obterMembros() {
    try {
        const resposta = await fetch("dados/membros.json");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os dados dos membros.");
        }

        const membros = await resposta.json();

        exibirMembros(membros);
    } catch (erro) {
        console.error("Erro ao carregar os membros:", erro);
        areaMembros.innerHTML = "<p>Não foi possível carregar os membros.</p>";
    }
}

// Exibe os membros na página
function exibirMembros(membros) {
    areaMembros.innerHTML = "";

    membros.forEach((membro) => {
        const cartao = document.createElement("article");

        cartao.classList.add("membro");

        cartao.innerHTML = `
            <img src="imagens/${membro.imagem}" alt="${membro.nome}">
            <h3>${membro.nome}</h3>
            <p>${membro.endereco}</p>
            <p>${membro.telefone}</p>
            <p><a href="${membro.url}" target="_blank">Visitar site</a></p>
            <p>Nível de associação: ${membro.nivel}</p>
            <p>${membro.descricao}</p>
        `;

        areaMembros.appendChild(cartao);
    });
}

// Alterna para a visualização em grade
botaoGrade.addEventListener("click", () => {
    areaMembros.classList.remove("lista");
    areaMembros.classList.add("grade");
});

// Alterna para a visualização em lista
botaoLista.addEventListener("click", () => {
    areaMembros.classList.remove("grade");
    areaMembros.classList.add("lista");
});

// Ano atual do copyright
document.querySelector("#ano").textContent = new Date().getFullYear();

// Data da última modificação
document.querySelector("#modificado").textContent = document.lastModified;

// Menu de navegação
const botaoMenu = document.querySelector("#menu");
const navegacao = document.querySelector("nav ul");

botaoMenu.addEventListener("click", () => {
    navegacao.classList.toggle("aberto");
});

// Carrega os membros
obterMembros();