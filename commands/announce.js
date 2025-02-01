const { measureMemory } = require("vm");

module.exports = {
    name: "a",
    description: "Mengulang kembali teks yang diberikan setelah tanda (')",
    async execute(message, args) {
      const ownerId = "697334077094887428"; 
        if (message.author.id !== ownerId) {
            message.delete()
            return message.channel.send(`🚫 Kamu tidak memiliki izin untuk menggunakan perintah ini ${message.author}!`);
        }


      if (args.length === 0) {
        return message.reply("❌ Tolong berikan teks untuk dikutip!");
        }
  
      const text = args.join(" ");
      await message.channel.send(`${text}`);
      await message.delete();
    },
  };
  