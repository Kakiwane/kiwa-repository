module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      try {
        await interaction.reply({
          content: "❌ Terjadi kesalahan!",
          ephemeral: true, // sama seperti flags: 64, tapi lebih jelas
        });
      } catch (err) {
        // Balasan mungkin gagal jika sudah ada reply, jadi kita tangani fallback-nya
        // Tapi kita tidak perlu tampilkan apa pun di console
      }
    }
  },
};












// module.exports = {
//     name: "interactionCreate",
//     async execute(interaction, client) {
//       if (!interaction.isCommand()) return;
  
//       // console.log(`🔍 Command detected: ${interaction.commandName}`);
  
//       const command = client.commands.get(interaction.commandName);
//       if (!command) {
//         // console.warn(`⚠️ Command ${interaction.commandName} tidak ditemukan.`);
//         return;
//       }
  
//       try {
//         await command.execute(interaction);
//       } catch (error) {
//         console.error(`❌ Error di command ${interaction.commandName}:`, error);
//         await interaction.reply({ content: "❌ Terjadi kesalahan!", flags: 64 });
//       }
//     },
//   };
  

