const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Menampilkan latensi bot (ping)'),
  
  async execute(interaction) {
    const sent = await interaction.deferReply({ fetchReply: true });
    const latency = sent.createdTimestamp - interaction.createdTimestamp;
    const apiLatency = interaction.client.ws.ping;

    const embed = new EmbedBuilder()
      .setTitle('🏓 Pong!')
      .setDescription('Berikut informasi latensi bot:')
      .addFields(
        { name: '💡 Respons Bot', value: `${latency}ms`, inline: true },
        { name: '📡 API WebSocket', value: `${apiLatency}ms`, inline: true }
      )
      .setColor(latency < 200 ? 'Green' : latency < 400 ? 'Yellow' : 'Red')
      .setFooter({ text: `Direspons oleh ${interaction.client.user.username}`, iconURL: interaction.client.user.displayAvatarURL() })
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  }
};
