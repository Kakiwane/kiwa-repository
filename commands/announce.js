// module.exports = {
//     name: "a",
//     description: "Mengulang kembali teks yang diberikan setelah tanda (')",
//     async execute(message, args) {
//       const ownerId = "697334077094887428"; 
//         if (message.author.id !== ownerId) {
//             message.delete()
//             return message.channel.send(`🚫 Kamu tidak memiliki izin untuk menggunakan perintah ini!`);
//         }


//       if (args.length === 0) {
//         return message.reply("❌ Tolong berikan teks untuk dikutip!");
//         }
  
//       const text = args.join(" ");
//       await message.channel.send(`${text}`);
//       await message.delete();
//     },
//   };

const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "a",
  description: "Mengulang kembali teks yang diberikan setelah tanda (')",
  async execute(message, args) {
    const ownerId = "697334077094887428"; 

    // Jika bukan pemilik
    if (message.author.id !== ownerId) {
      const embed = new EmbedBuilder()
        .setTitle("🚫 Akses Ditolak")
        .setDescription("Kamu tidak memiliki izin untuk menggunakan perintah ini!")
        .setColor(0xFF0000) // Merah
        .setTimestamp();

      return message.reply({ embeds: [embed] });
    }

    if (args.length === 0) {
      return message.reply("❌ Tolong berikan teks untuk dikutip!");
    }

    const text = args.join(" ");
    await message.channel.send(`${text}`);
    await message.delete(); // hanya menghapus jika user adalah owner
  },
};
