const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("list")
    .setDescription("Melihat list command!"),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setAuthor({name: "List Command", iconURL: interaction.client.user.displayAvatarURL()})
      .setDescription("Deskripsi")
      .setColor('#FFFFFF')

    await interaction.reply({ embeds: [embed] });
  },
};