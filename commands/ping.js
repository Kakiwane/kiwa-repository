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
      .setColor('#211F20') // Warna biru Discord
      .setTitle('🏓 Pong!')
      .setDescription(
        `📶 **Client Latency:** \`${clientLatency}ms\`\n` +
        `💓 **Shard Latency:** \`${shardLatency}ms\``
      )
      .setFooter({ text: `Diminta oleh ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
      .setTimestamp();

    await interaction.reply({ embeds: [pingEmbed] });
  },
};