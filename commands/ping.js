const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Balas dengan Pong!"),
  async execute(interaction) {
    const clientLatency = Date.now() - interaction.createdTimestamp; // Hitung latency bot
    const shardLatency = Math.round(interaction.client.ws.ping); // Ping API WebSocket Discord

    const pingEmbed = new EmbedBuilder()
    .setColor('#FFFFFF')
    .setTitle('🏓 Pong!')
    .setDescription(
      `:hourglass: **Client Latency:** \`${clientLatency}ms\`\n` +
      `:watch: **Web Socket:** \`${shardLatency}ms\``
    )
    .setFooter({ text: `Diminta oleh ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
    .setTimestamp();

    await interaction.reply({ embeds: [pingEmbed] });
  },
};