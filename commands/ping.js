// const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

// module.exports = {
//   data: new SlashCommandBuilder()
//     .setName("ping")
//     .setDescription("Balas dengan Pong!"),
//   async execute(interaction) {
//     const clientLatency = Date.now() - interaction.createdTimestamp;
//     const shardLatency = Math.round(interaction.client.ws.ping);

//     const pingEmbed = new EmbedBuilder()
//       .setColor('#FFFFFF')
//       .setTitle('🏓 Pong!')
//       .setDescription(
//         `:hourglass: **Client Latency:** \`${clientLatency}ms\`\n` +
//         `:watch: **WebSocket:** \`${shardLatency}ms\``
//       )
//       .setFooter({ text: `Diminta oleh ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
//       .setTimestamp();

//     await interaction.reply({ embeds: [pingEmbed] });
//   },
// };




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
