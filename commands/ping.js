const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "ping",
    description: "Mostra o ping do bot",
  },
  execute: async (client, message, args) => {
    try {
      const ping = client.ws.ping >= 0 ? `${client.ws.ping}ms` : "Indisponível";
      const gatewayDelay = Math.max(0, Date.now() - message.createdTimestamp);
      const formattedDelay = gatewayDelay < 1 ? `${gatewayDelay.toFixed(3)}ms` : `${gatewayDelay}ms`;
      
      const embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle(":ping_pong: Pong!")
        .addFields(
          { name: ":dizzy: WebSocket Ping", value: ping, inline: true },
          { name: ":watch: Gateway Delay", value: `${formattedDelay}`, inline: true }
        )
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error("Erro ao calcular o ping:", error);
      message.channel.send("Não foi possível calcular o ping no momento.");
    }
  },
};
