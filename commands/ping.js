const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Balas dengan Pong!"),
  async execute(interaction) {
    const clientLatency = Date.now() - interaction.createdTimestamp; // Hitung latency bot
    const shardLatency = Math.round(interaction.client.ws.ping); // Ping API WebSocket Discord

    // Buat embed yang rapi
    const pingEmbed = new EmbedBuilder()
      .setColor('#FFFFFF') // Warna biru Discord
      .setTitle('🏓 Pong!')
      .setDescription(
        `:hourglass: \t**Client Latency:** \`${clientLatency}ms\`\n` +
        `:watch: \t**Web Socket:** \`${shardLatency}ms\``
      )
      .setFooter({ text: `Diminta oleh ${message.author.tag}`, iconURL: message.author.displayAvatarURL() })
      .setTimestamp();

    await interaction.reply({ embeds: [pingEmbed] });
  },
};