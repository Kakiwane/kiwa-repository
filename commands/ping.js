const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Balas dengan Pong!"),
  async execute(interaction) {
    const clientLatency = Date.now() - interaction.createdTimestamp;
    const shardLatency = Math.round(interaction.client.ws.ping);

    const pingEmbed = new EmbedBuilder()
      .setColor('#FFFFFF')
      .setTitle('🏓 Pong!')
      .setDescription(
        `:hourglass: **Client Latency:** \`${clientLatency}ms\``
      )
      .setFooter({ text: `Diminta oleh ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
      .setTimestamp();

    await interaction.reply({ embeds: [pingEmbed] });
  },
};



        // `:watch: **WebSocket:** \`${shardLatency}ms\``