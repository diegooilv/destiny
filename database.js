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

module.exports = {
    recuperarDados,
    salvarDados
};
