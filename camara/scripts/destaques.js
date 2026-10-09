
const areaDestaques = document.querySelector("#membros-destaque");

// Busca os membros e escolhe empresas dos níveis Prata e Ouro
async function mostrarDestaques() {
    try {
        const resposta = await fetch("dados/membros.json");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os membros.");
        }

        const membros = await resposta.json();

        const empresas = membros.filter((membro) => {
            return membro.nivel === 2 || membro.nivel === 3;
        });

        empresas.sort(() => Math.random() - 0.5);

        const selecionadas = empresas.slice(0, 3);

        areaDestaques.innerHTML = "";

        selecionadas.forEach((membro) => {
            const cartao = document.createElement("article");

            cartao.classList.add("membro");

            cartao.innerHTML = `
                <img src="imagens/${membro.imagem}" alt="${membro.nome}">
                <h3>${membro.nome}</h3>
                <p>${membro.telefone}</p>
                <p>${membro.endereco}</p>
                <p><a href="${membro.url}" target="_blank" rel="noopener noreferrer">Visitar site</a></p>
                <p>Nível de associação: ${membro.nivel}</p>
            `;

            areaDestaques.appendChild(cartao);
        });
    } catch (erro) {
        console.error("Erro ao carregar os destaques:", erro);
        areaDestaques.textContent = "Não foi possível carregar as empresas em destaque.";
    }
}

mostrarDestaques();