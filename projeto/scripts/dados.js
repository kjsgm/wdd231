export async function carregarReceitas() {
    try {
        const resposta = await fetch("dados/receitas.json");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar as receitas.");
        }

        const receitas = await resposta.json();
        return receitas;
    } catch (erro) {
        console.error("Erro ao carregar as receitas:", erro);
        return [];
    }
}