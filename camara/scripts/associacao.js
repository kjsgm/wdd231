const campoDataHora = document.querySelector("#dataHora");

if (campoDataHora) {
    campoDataHora.value = new Date().toISOString();
}

const linksModal = document.querySelectorAll(".abrir-modal");

linksModal.forEach((link) => {
    link.addEventListener("click", (evento) => {
        evento.preventDefault();

        const modalId = link.dataset.modal;
        const modal = document.querySelector(`#${modalId}`);
        if (modal) {
            modal.showModal();
        }
    });

});

const botoesFechar = document.querySelectorAll(".fechar-modal");

botoesFechar.forEach((botao) => {
    botao.addEventListener("click", () => {
        botao.closest("dialog").close();
    });
});

document.querySelectorAll("dialog").forEach((modal) => {
    modal.addEventListener("click", (evento) => {
        if (evento.target === modal) {
            modal.close();
        }
    });
});