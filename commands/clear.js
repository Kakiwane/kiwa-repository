// const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

// module.exports = {
//   data: new SlashCommandBuilder()
//     .setName("clear")
//     .setDescription("Menghapus sejumlah pesan di chat")
//     .addIntegerOption(option =>
//       option.setName("jumlah")
//         .setDescription("Jumlah pesan yang akan dihapus")
//         .setRequired(true)
//     )
//     .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
//   async execute(interaction) {
//     const amount = interaction.options.getInteger("jumlah");

//     if (amount < 1 || amount > 100) {
//       // Opsional
//         // const { MessageFlags } = require("discord.js");
//         await interaction.reply({ content: "❌ Kamu tidak memiliki izin!", flags: 64 });        
//     }

//     try {
//       const balasan = await interaction.channel.bulkDelete(amount, true);
//       await interaction.reply({ content: `Berhasil menghapus ${balasan.size} pesan!`, flags: 64 });

//     } catch (error) {
//       console.error(error);
//       await interaction.reply({ content: "❌ Gagal menghapus pesan. Mungkin pesan sudah terlalu lama!", flags: 64 });
//     }
//   },
// };





const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Menghapus sejumlah pesan di chat")
    .addIntegerOption(option =>
      option.setName("jumlah")
        .setDescription("Jumlah pesan yang akan dihapus (boleh lebih dari 100)")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const amount = interaction.options.getInteger("jumlah");

    if (amount < 1) {
      return interaction.reply({ content: "❌ Jumlah harus lebih dari 0!", ephemeral: true });
    }

    let totalDeleted = 0;
    let remaining = amount;

    try {
      while (remaining > 0) {
        const batchSize = Math.min(remaining, 100);
        const deleted = await interaction.channel.bulkDelete(batchSize, true);
        totalDeleted += deleted.size;

        // Stop loop kalau pesan yang bisa dihapus sudah habis
        if (deleted.size < batchSize) break;

        remaining -= batchSize;
      }

      await interaction.reply({
        content: `✅ Berhasil menghapus ${totalDeleted} pesan!`,
        ephemeral: true,
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "❌ Gagal menghapus pesan. Pastikan pesan tidak lebih dari 14 hari.",
        ephemeral: true,
      });
    }
  },
};
