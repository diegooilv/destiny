const SimpDB = require('simpl.db');

const db = new SimpDB({
    filepath: './database.json',
    autosave: true
});

// Função para recuperar uma variável específica de um usuário
async function recuperarDados(userId, variavel) {
    const user = await db.get(userId);
    return user ? user[variavel] : null; // Retorna o valor ou null se não existir
}

// Função para salvar/atualizar uma variável específica de um usuário
async function salvarDados(userId, variavel, valor) {
    // Recupera os dados existentes ou cria um novo objeto vazio
    let user = await db.get(userId) || {};
    // Atualiza o valor da variável especificada
    user = { ...user, [variavel]: valor };
    // Salva o objeto atualizado no banco de dados
    await db.set(userId, user);
    return true;
}

// Função para somar um valor a uma variável específica de um usuário
async function somar(userId, variavel, valorParaSomar) {
    if (typeof valorParaSomar !== 'number' || isNaN(valorParaSomar)) {
        throw new Error(`O valor fornecido para somar (${valorParaSomar}) não é numérico.`);
    }
    const valorAtual = await recuperarDados(userId, variavel) || 0; // Recupera o valor atual ou assume 0
    const novoValor = valorAtual + valorParaSomar; // Soma o valor
    await salvarDados(userId, variavel, novoValor); // Salva o novo valor
    return;
}

// Função para subtrair um valor de uma variável específica de um usuário
async function subtrair(userId, variavel, valorParaSubtrair) {
    if (typeof valorParaSubtrair !== 'number' || isNaN(valorParaSubtrair)) {
        throw new Error(`O valor fornecido para subtrair (${valorParaSubtrair}) não é numérico.`);
    }
    const valorAtual = await recuperarDados(userId, variavel) || 0; // Recupera o valor atual ou assume 0
    const novoValor = valorAtual - valorParaSubtrair; // Subtrai o valor
    await salvarDados(userId, variavel, novoValor); // Salva o novo valor
    return;
}

module.exports = {
    recuperarDados,
    salvarDados,
    somar,
    subtrair
};
