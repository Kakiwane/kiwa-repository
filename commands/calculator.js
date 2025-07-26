const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { evaluate } = require("mathjs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("math")
    .setDescription("Kalkulator sederhana")
    .addNumberOption(option =>
      option.setName("angka1")
      .setDescription("Angka pertama")
      .setRequired(true)
    )
    .addStringOption(option =>
      option.setName("operator")
      .setDescription("Operator matematika")
        .setRequired(true)
        .addChoices(
            { name: "Tambah (+)", value: "+" },
            { name: "Kurang (-)", value: "-" },
            { name: "Kali (*)", value: "*" },
            { name: "Bagi (/)", value: "/" }
        )
    )
    .addNumberOption(option =>
        option.setName("angka2")
        .setDescription("Angka kedua")
        .setRequired(true)
    ),
    
    async execute(interaction) {
        const angka1 = interaction.options.getNumber("angka1");
        const operator = interaction.options.getString("operator");
        const angka2 = interaction.options.getNumber("angka2");
        
        let result;
        const expression = `${angka1} ${operator} ${angka2}`;
        
        try {
            result = evaluate(expression);
            result = parseFloat(result.toFixed(2));
            
            const embed = new EmbedBuilder()
            .setColor("#00FF00")
            .setTitle("🧮 Kalkulator")
            .setDescription(`\`${expression}\` = **${result}**`)
            .setFooter({ text: `Diminta oleh ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();
            
            await interaction.reply({ embeds: [embed] });
            
        } catch (error) {
            await interaction.reply({
                content: "❌ Terjadi kesalahan saat menghitung ekspresi matematika.",
                ephemeral: true
            });
        }
    },
};

// Tanpa SlashCommand

// const { evaluate } = require("mathjs");

// module.exports = {
//     name: "m",
//     description: "Kalkulator sederhana",
//     async execute(message, args) {
//         if (args.length === 0) {
//             return message.reply("❌ Tolong berikan ekspresi matematika untuk dihitung!");
//         }

//         const expression = args.join(" ");
//         try {
//             let result = evaluate(expression);

//             // Memastikan hasil selalu berupa float dengan 2 angka desimal
//             if (typeof result === "number") {
//                 result = parseFloat(result.toFixed(2));
//             }

//             await message.reply(`Hasil dari \`${expression}\` adalah **${result}**`);
//         } catch (error) {
//             await message.reply("❌ Ekspresi matematika tidak valid!");
//         }
//     },
// };


