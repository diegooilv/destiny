const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const config = require('./config.json');

const token = process.env.TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Map();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Carrega os comandos da pasta 'commands'
for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  client.commands.set(command.data.name, command);
}

client.once('ready', () => {
  console.log('Bot está online!');
});

// Lida com comandos de prefixo
client.on('messageCreate', message => {
  if (message.author.bot) return;  // Ignora mensagens de outros bots
  
  // Verifica se a mensagem começa com o prefixo configurado
  if (!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);  
  const commandName = args.shift().toLowerCase();  

  // Verifica se o comando existe
  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  try {
    command.execute(message, args);  // Executa o comando
  } catch (error) {
    console.error(error);
    message.reply('Houve um erro ao tentar executar esse comando!');
  }
});

// Login do bot com o token
client.login(token);
