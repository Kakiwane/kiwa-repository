module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
      if (!interaction.isCommand()) return;
  
      console.log(`🔍 Command detected: ${interaction.commandName}`);
  
      const command = client.commands.get(interaction.commandName);
      if (!command) {
        console.warn(`⚠️ Command ${interaction.commandName} tidak ditemukan.`);
        return;
      }
  
      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(`❌ Error di command ${interaction.commandName}:`, error);
        await interaction.reply({ content: "❌ Terjadi kesalahan!", flags: 64 });
      }
    },
  };
  