import { carregarReceitas } from "./dados.js";

const CHAVE_FAVORITOS = "receitasFavoritas";

function obterFavoritos() {
    try {
        return JSON.parse(localStorage.getItem(CHAVE_FAVORITOS)) || [];
    } catch (erro) {
        console.error("Erro ao carregar favoritos:", erro);
        return [];
    }
}

function salvarFavoritos(favoritos) {
    localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(favoritos));
}

function mostrarDadosFormulario() {
    const areaDados = document.querySelector("#dados-formulario");

    if (!areaDados) {
        return;
    }

    const parametros = new URLSearchParams(window.location.search);
    const nome = parametros.get("nome");
    const categoria = parametros.get("categoria");
    const ingredientes = parametros.get("ingredientes");
    const preparo = parametros.get("preparo");

    if (!nome || !categoria || !ingredientes || !preparo) {
        areaDados.innerHTML = "<p>Nenhuma sugestão de receita foi enviada.</p>";
        return;
    }

    const titulo = document.createElement("h3");
    titulo.textContent = nome;

    const textoCategoria = document.createElement("p");
    textoCategoria.textContent = `Categoria: ${categoria} `;

    const tituloIngredientes = document.createElement("h3");
    tituloIngredientes.textContent = "Ingredientes";

    const listaIngredientes = document.createElement("p");
    listaIngredientes.textContent = ingredientes;

    const tituloPreparo = document.createElement("h3");
    tituloPreparo.textContent = "Modo de preparo";

    const textoPreparo = document.createElement("p");
    textoPreparo.textContent = preparo;

    areaDados.replaceChildren(
        titulo,
        textoCategoria,
        tituloIngredientes,
        listaIngredientes,
        tituloPreparo,
        textoPreparo
    );
}

async function mostrarReceitas() {
    const receitas = await carregarReceitas();

    const listaDestaque = document.querySelector("#receitas-destaque");
    const listaCompleta = document.querySelector("#lista-receitas");
    const listaFavoritos = document.querySelector("#lista-favoritos");
    const lista = listaDestaque || listaCompleta || listaFavoritos;

    const filtroCategoria = document.querySelector("#filtro-categoria");
    const buscaReceita = document.querySelector("#busca-receita");

    if (!lista) {
        return;
    }

    const paginaFavoritos = Boolean(listaFavoritos);

    function mostrarLista() {
        let receitasExibidas = receitas;

        if (paginaFavoritos) {
            const favoritos = obterFavoritos();
            receitasExibidas = receitas.filter((receita) =>
                favoritos.includes(receita.id)
            );
        } else {
            const categoriaSelecionada = filtroCategoria?.value || "todas";
            const textoBusca = buscaReceita?.value.toLowerCase().trim() || "";

            receitasExibidas = receitas.filter((receita) => {
                const correspondeCategoria =
                    categoriaSelecionada === "todas" ||
                    receita.categoria === categoriaSelecionada;

                const correspondeBusca =
                    receita.nome.toLowerCase().includes(textoBusca);

                return correspondeCategoria && correspondeBusca;
            });
        }

        if (listaDestaque) {
            receitasExibidas = receitasExibidas.slice(0, 3);
        }

        lista.innerHTML = "";

        receitasExibidas.forEach((receita) => {
            const cartao = document.createElement("article");
            cartao.classList.add("cartao-receita");

            const favoritos = obterFavoritos();
            const estaFavorita = favoritos.includes(receita.id);

            cartao.innerHTML = `
    
                <h2>${receita.nome}</h2>
                <p><strong>Categoria:</strong> ${receita.categoria}</p>
                <p><strong>Tempo:</strong> ${receita.tempo}</p>
                <button type="button" class="botao-detalhes">Ver receita</button>
                <button type="button" class="botao-favorito">
                    ${estaFavorita ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                </button>
`;

            const botaoDetalhes = cartao.querySelector(".botao-detalhes");
            const botaoFavorito = cartao.querySelector(".botao-favorito");

            botaoDetalhes.addEventListener("click", () => {
                const modal = document.querySelector("#modal-receita");
                const detalhes = document.querySelector("#detalhes-receita");

                if (!modal || !detalhes) {
                    return;
                }

                detalhes.innerHTML = `
    <h2>${receita.nome}</h2>
                    <h3>Ingredientes</h3>
                    <ul>
                        ${receita.ingredientes.map((ingrediente) =>
                    `<li>${ingrediente}</li>`
                ).join("")}
                    </ul>
                    <h3>Modo de preparo</h3>
                    <ol>
                        ${receita.preparo.map((etapa) =>
                    `<li>${etapa}</li>`
                ).join("")}
                    </ol>
`;

                modal.showModal();
            });

            botaoFavorito.addEventListener("click", () => {
                let favoritosAtuais = obterFavoritos();

                if (favoritosAtuais.includes(receita.id)) {
                    favoritosAtuais = favoritosAtuais.filter(
                        (id) => id !== receita.id
                    );
                } else {
                    favoritosAtuais.push(receita.id);
                }

                salvarFavoritos(favoritosAtuais);
                mostrarLista();
            });

            lista.appendChild(cartao);
        });

        if (receitasExibidas.length === 0) {
            lista.innerHTML = paginaFavoritos
                ? "<p>Você ainda não salvou receitas favoritas.</p>"
                : "<p>Nenhuma receita encontrada.</p>";
        }
    }

    if (filtroCategoria) {
        filtroCategoria.addEventListener("change", mostrarLista);
    }

    if (buscaReceita) {
        buscaReceita.addEventListener("input", mostrarLista);
    }

    mostrarLista();
}

const botaoFechar = document.querySelector("#fechar-modal");

if (botaoFechar) {
    botaoFechar.addEventListener("click", () => {
        const modal = document.querySelector("#modal-receita");

        if (modal) {
            modal.close();
        }
    });
}

mostrarDadosFormulario();
mostrarReceitas();
const botaoMenu = document.querySelector("#botao-menu");
const menu = document.querySelector("#menu");

if (botaoMenu && menu) {
    botaoMenu.addEventListener("click", () => {
        menu.classList.toggle("menu-aberto");

        const menuAberto = menu.classList.contains("menu-aberto");

        botaoMenu.setAttribute("aria-expanded", menuAberto);
        botaoMenu.setAttribute(
            "aria-label",
            menuAberto ? "Fechar menu" : "Abrir menu"
        );
    });
}