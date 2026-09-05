const cursos = [
    {
        subject: "CSE",
        number: 110,
        title: "Introdução à Programação",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 130,
        title: "Fundamentos da Web",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programação com Funções",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programação com Classes",
        credits: 2,
        completed: false
    },
    {
        subject: "WDD",
        number: 131,
        title: "JavaScript Dinâmico",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 231,
        title: "Desenvolvimento Web Front-end",
        credits: 2,
        completed: false
    }
];

const listaCursos = document.querySelector("#lista-cursos");
const totalCreditos = document.querySelector("#total-creditos");
const botaoTodos = document.querySelector("#todos");
const botaoWdd = document.querySelector("#wdd");
const botaoCse = document.querySelector("#cse");

function exibirCursos(cursosSelecionados) {
    listaCursos.innerHTML = "";

    cursosSelecionados.forEach((curso) => {
        const cartao = document.createElement("div");

        cartao.classList.add("curso");

        if (curso.completed) {
            cartao.classList.add("concluido");
        }

        cartao.textContent = `${curso.subject} ${curso.number}`;

        cartao.setAttribute(
            "aria-label",
            `${curso.subject} ${curso.number}: ${curso.title}, ` +
            `${curso.credits} créditos, ` +
            `${curso.completed ? "concluído" : "não concluído"}`
        );

        listaCursos.appendChild(cartao);
    });

    const creditos = cursosSelecionados.reduce(
        (total, curso) => total + curso.credits,
        0
    );

    totalCreditos.textContent =
        `Total de créditos dos cursos exibidos: ${creditos}`;
}

botaoTodos.addEventListener("click", () => {
    exibirCursos(cursos);
});

botaoWdd.addEventListener("click", () => {
    const cursosWdd = cursos.filter((curso) => curso.subject === "WDD");
    exibirCursos(cursosWdd);
});

botaoCse.addEventListener("click", () => {
    const cursosCse = cursos.filter((curso) => curso.subject === "CSE");
    exibirCursos(cursosCse);
});

exibirCursos(cursos);