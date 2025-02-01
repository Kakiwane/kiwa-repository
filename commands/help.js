const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Balas dengan Pong!"),
  async execute(interaction) {
    const embed = new EmbedBuilder()
    .setAuthor({name: "List Command", iconURL: message.client.user.displayAvatarURL()})
    .setDescription("Deskripsi")
    .setColor('#211F20')

    await interaction.reply({ embeds: [embed] });
  },
};