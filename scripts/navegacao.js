const botaoMenu = document.querySelector("#botao-menu");
const menuNavegacao = document.querySelector("#menu-navegacao");

botaoMenu.addEventListener("click", () => {
    menuNavegacao.classList.toggle("aberto");

    const menuEstaAberto = menuNavegacao.classList.contains("aberto");

    botaoMenu.setAttribute("aria-expanded", menuEstaAberto);
    botaoMenu.setAttribute(
        "aria-label",
        menuEstaAberto
            ? "Fechar menu de navegação"
            : "Abrir menu de navegação"
    );

    botaoMenu.innerHTML = menuEstaAberto ? "&#10005;" : "&#9776;";
});