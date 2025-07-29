const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Menghapus sejumlah pesan di chat")
    .addIntegerOption(option =>
      option.setName("jumlah")
        .setDescription("Jumlah pesan yang akan dihapus")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction) {
    const amount = interaction.options.getInteger("jumlah");

    // if (amount < 1 || amount > 100) {
    //   // Opsional
    //     // const { MessageFlags } = require("discord.js");
    //     await interaction.reply({ content: "❌ Kamu tidak memiliki izin!", flags: 64 });        
    // }

    try {
      const balasan = await interaction.channel.bulkDelete(amount, true);
      await interaction.reply({ content: `Berhasil menghapus ${balasan.size} pesan!`, flags: 64 });

    } catch (error) {
      console.error(error);
      await interaction.reply({ content: "❌ Gagal menghapus pesan. Mungkin pesan sudah terlalu lama!", flags: 64 });
    }
  },
};
