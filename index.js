const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const token = process.env.TOKEN;
const SimpDB = require('simpl.db');
const db = new SimpDB({
  filepath: './database.json',  
  autosave: true
});

const bot = db.get('bot');
const prefix = bot.prefix;
console.log(prefix);

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

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  client.commands.set(command.data.name, command);
}

client.once('ready', () => {
  console.log('Bot está online!');
});

client.on('messageCreate', message => {
  if (message.author.bot) return;  

  if (message.mentions.has(client.user)) {
    message.reply(`**(⚡) - ${message.author.username}**, você me marcou? Use \`${prefix}ajuda\` para mais informações.`)};
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);  
  const commandName = args.shift().toLowerCase();  

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  try {
    command.execute(client, message, args);  
  } catch (error) {
    console.error(error);
    message.reply('Houve um erro ao tentar executar esse comando!');
  }
});

client.login(token);
