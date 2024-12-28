const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: {
    name: 'hello',
  },
  execute(message, args) {
    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Saudações!')
      .setDescription('Olá! Como posso te ajudar?')
      .addFields(
        { name: 'Comando', value: '!hello', inline: true },
        { name: 'Autor', value: message.author.username, inline: true }
      )
      .setTimestamp()
      .setFooter({ text: 'Comando Hello', iconURL: 'https://example.com/icon.png' });

    message.reply({ embeds: [embed] });
  },
};
