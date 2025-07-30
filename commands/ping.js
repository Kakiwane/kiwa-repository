const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { createCanvas, registerFont } = require('canvas');

// (Opsional) Daftarkan font custom
// registerFont('./fonts/YourFont.ttf', { family: 'CustomFont' });

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('🏓 Tampilkan latency dalam bentuk gambar'),

    async execute(interaction) {
        const sent = await interaction.reply({ content: '📷 Membuat gambar...', fetchReply: true });

        const clientLatency = sent.createdTimestamp - interaction.createdTimestamp;
        const shardLatency = interaction.client.ws.ping;

        // Create canvas
        const width = 600;
        const height = 250;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        // Background
        ctx.fillStyle = '#2f3136'; // Discord dark background
        ctx.fillRect(0, 0, width, height);

        // Judul
        ctx.fillStyle = '#ffffff';
        ctx.font = '28px Arial';
        ctx.fillText('🏓 PONG / LATENCY', 20, 40);

        // Kotak Client Latency
        ctx.fillStyle = '#232428';
        ctx.fillRect(20, 70, 260, 100);
        ctx.fillStyle = '#ffffff';
        ctx.font = '20px Arial';
        ctx.fillText('😊 Client latency', 30, 100);
        ctx.font = '32px monospace';
        ctx.fillText(`${clientLatency} MS`, 30, 140);

        // Kotak Shard Latency
        ctx.fillStyle = '#232428';
        ctx.fillRect(320, 70, 260, 100);
        ctx.fillStyle = '#ffffff';
        ctx.font = '20px Arial';
        ctx.fillText('😊 Shard latency', 330, 100);
        ctx.font = '32px monospace';
        ctx.fillText(`${Math.round(shardLatency)} MS`, 330, 140);

        // Footer
        ctx.fillStyle = '#a0a0a0';
        ctx.font = '16px Arial';
        ctx.fillText('Issues on Discord\'s side could create weird or high latency.', 20, 200);

        // Button style info (fake)
        ctx.fillStyle = '#4f545c';
        ctx.fillRect(20, 210, 130, 30);
        ctx.fillStyle = '#ffffff';
        ctx.font = '16px Arial';
        ctx.fillText('Status Page 🔗', 30, 232);

        ctx.fillStyle = '#4f545c';
        ctx.fillRect(170, 210, 150, 30);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Server Uptime 🔗', 180, 232);

        const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'latency.png' });

        await interaction.editReply({ content: '', files: [attachment] });
    }
};



















// const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

// module.exports = {
//   data: new SlashCommandBuilder()
//     .setName('ping')
//     .setDescription('Menampilkan latensi bot (ping)'),
  
//   async execute(interaction) {
//     const sent = await interaction.deferReply({ fetchReply: true });
//     const latency = sent.createdTimestamp - interaction.createdTimestamp;
//     const apiLatency = interaction.client.ws.ping;

//     const embed = new EmbedBuilder()
//       .setTitle('🏓 Pong!')
//       .setDescription('Berikut informasi latensi bot:')
//       .addFields(
//         { name: '💡 Respons Bot', value: `${latency}ms`, inline: true },
//         { name: '📡 API WebSocket', value: `${apiLatency}ms`, inline: true }
//       )
//       .setColor(latency < 200 ? 'Green' : latency < 400 ? 'Yellow' : 'Red')
//       .setFooter({ text: `Direspons oleh ${interaction.client.user.username}`, iconURL: interaction.client.user.displayAvatarURL() })
//       .setTimestamp();

//     await interaction.editReply({ embeds: [embed] });
//   }
// };
