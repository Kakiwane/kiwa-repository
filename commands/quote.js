module.exports = {
    name: "q",
    description: "Mengulang kembali teks yang diberikan setelah tanda (')",
    async execute(message, args) {
      if (args.length === 0) {
        return message.reply("❌ Tolong berikan teks untuk dikutip!");
        }
  
      const text = args.join(" ");
      await message.channel.send(`${text}`);
      await message.delete();
    },
  };
  