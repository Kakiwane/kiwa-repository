module.exports = {
    name: "messageCreate",
    async execute(message, client) {
      if (message.author.bot) return; // Abaikan pesan dari bot
      if (!message.content.startsWith("`")) return; // Pastikan pesan diawali dengan `
  
      const args = message.content.slice(1).trim().split(/ +/);
      const commandName = args.shift().toLowerCase();
  
      const command = client.textCommands.get(commandName);
      if (!command) return;
  
      try {
        await command.execute(message, args);
      } catch (error) {
        console.error(error);
        await message.reply("❌ Terjadi kesalahan saat menjalankan perintah!");
      }
    },
  };
  