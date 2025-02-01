module.exports = {
    name: "q",
    description: "Mengulang kembali teks yang diberikan setelah tanda (')",
    async execute(message, args) {
      const ownerId = "697334077094887428"; // Ganti dengan ID Discord Anda

        if (message.author.id !== ownerId) {
            return message.reply("🚫 Kamu tidak memiliki izin untuk menggunakan perintah ini!");
        }


      if (args.length === 0) {
        return message.reply("❌ Tolong berikan teks untuk dikutip!");
        }
  
      const text = args.join(" ");
      await message.channel.send(`${text}`);
      await message.delete();
    },
  };
  