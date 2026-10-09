
const chaveAPI = "9971c959f85162724ca06e4bbf02d6f0";

const url = `https://api.openweathermap.org/data/2.5/weather?lat=13.48&lon=-88.18&units=metric&appid=${chaveAPI}`;

const urlPrevisao = `https://api.openweathermap.org/data/2.5/forecast?lat=13.48&lon=-88.18&units=metric&appid=${chaveAPI}`;

// Busca o clima atual
async function apiFetch() {
    try {
        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar o clima atual.");
        }

        const dados = await resposta.json();

        document.querySelector("#temperatura").textContent =
            dados.main.temp.toFixed(1);

        document.querySelector("#descricao").textContent =
            dados.weather[0].description;
    } catch (erro) {
        console.error("Erro ao buscar o clima atual:", erro);
    }
}

// Busca a previsão do tempo
async function previsaoFetch() {
    try {
        const resposta = await fetch(urlPrevisao);

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar a previsão.");
        }

        const dados = await resposta.json();

        mostrarPrevisao(dados);
    } catch (erro) {
        console.error("Erro ao buscar a previsão:", erro);
    }
}

// Mostra a previsão para três dias futuros diferentes
function mostrarPrevisao(dados) {
    const previsao = document.querySelector("#previsao-dias");
    previsao.innerHTML = "";

    // Descobre a data atual no horário de San Miguel
    const agora = new Date();
    const horarioLocal = new Date(
        agora.getTime() + dados.city.timezone * 1000
    );
    const hoje = horarioLocal.toISOString().slice(0, 10);

    // Organiza as previsões por data
    const dias = {};

    dados.list.forEach((item) => {
        const data = item.dt_txt.split(" ")[0];

        if (data > hoje) {
            if (!dias[data]) {
                dias[data] = item;
            }

            // Prefere o registro próximo do meio-dia
            if (item.dt_txt.includes("12:00:00")) {
                dias[data] = item;
            }
        }
    });

    const datas = Object.keys(dias).sort().slice(0, 3);

    if (datas.length === 0) {
        previsao.textContent = "A previsão dos próximos dias não está disponível.";
        return;
    }

    datas.forEach((data) => {
        const item = dias[data];
        const [ano, mes, dia] = data.split("-").map(Number);

        const dataFormatada = new Date(ano, mes - 1, dia)
            .toLocaleDateString("pt-BR", {
                weekday: "long",
                day: "numeric",
                month: "long"
            });

        const div = document.createElement("div");

        const titulo = document.createElement("h4");
        titulo.textContent =
            dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);

        const temperatura = document.createElement("p");
        temperatura.textContent = `${item.main.temp.toFixed(1)} °C`;

        const descricao = document.createElement("p");
        descricao.textContent = item.weather[0].description;

        div.appendChild(titulo);
        div.appendChild(temperatura);
        div.appendChild(descricao);

        previsao.appendChild(div);
    });
}

// Executa as duas buscas
apiFetch();
previsaoFetch();