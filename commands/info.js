const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sm')
        .setDescription('Show server member statistics')
        .setDMPermission(false),

    async execute(interaction) {
        await interaction.deferReply();

        const guild = interaction.guild;
        await guild.members.fetch();

        const totalMembers = guild.memberCount;
        const onlineMembers = guild.members.cache.filter(m => m.presence?.status === 'online').size;
        const bots = guild.members.cache.filter(m => m.user.bot).size;
        const humans = totalMembers - bots;
        const boostLevel = guild.premiumTier;
        const boosters = guild.premiumSubscriptionCount;

        const embed = new EmbedBuilder()
            .setColor('#2b2d31')
            .setTitle(`📊 ${guild.name} Member Statistics`)
            .setThumbnail(guild.iconURL())
            .addFields(
                { name: '👥 Total Members', value: `\n\n**\`\`\`\n${totalMembers}\n\`\`\`**`, inline: true },
                { name: '🙂 Humans', value: `\n\n**\`\`\`\n${humans}\n\`\`\`**`, inline: true },
                { name: '🤖 Bots', value: `\n\n**\`\`\`\n${bots}\n\`\`\`**`, inline: true },
                { name: '🟢 Online', value: `\n\n**\`\`\`\n${onlineMembers}\n\`\`\`**`, inline: true },
                { name: '🚀 Boost Level', value: `\n\n**\`\`\`\nLevel ${boostLevel}\n\`\`\`**`, inline: true },
                { name: '🎁 Boosters', value: `\n\n**\`\`\`\n${boosters}\n\`\`\`**`, inline: true },
                { name: '📅 Created', value: `\n\n<t:${Math.floor(guild.createdTimestamp / 1000)}:D>`, inline: true },
                { name: '👑 Owner', value: `\n\n<@${guild.ownerId}>`, inline: true }
            )
            .setFooter({ text: 'Server Information' })
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
    },

    category: 'Information'
};





// const {
//     SlashCommandBuilder,
//     EmbedBuilder,
//     ActionRowBuilder,
//     ButtonBuilder,
//     ButtonStyle,
//     ComponentType
// } = require('discord.js');

// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName('sm')
//         .setDescription('📈 Tampilkan statistik member server')
//         .setDMPermission(false),

//     async execute(interaction) {
//         await interaction.deferReply();

//         const sendStats = async () => {
//             const guild = interaction.guild;
//             await guild.members.fetch();

//             const totalMembers = guild.memberCount;
//             const onlineMembers = guild.members.cache.filter(m => m.presence?.status === 'online').size;
//             const bots = guild.members.cache.filter(m => m.user.bot).size;
//             const humans = totalMembers - bots;
//             const boosters = guild.premiumSubscriptionCount || 0;
//             const boostLevel = guild.premiumTier;

//             const embed = new EmbedBuilder()
//                 .setColor('#5865F2')
//                 .setTitle(`📊 Statistik Member: ${guild.name}`)
//                 .setThumbnail(guild.iconURL({ dynamic: true }))
//                 .addFields(
//                     { name: '👥 Total Member', value: `${totalMembers.toLocaleString()}`, inline: true },
//                     { name: '🧑‍🤝‍🧑 Manusia', value: `${humans.toLocaleString()}`, inline: true },
//                     { name: '🤖 Bot', value: `${bots.toLocaleString()}`, inline: true },
//                     { name: '🟢 Online Sekarang', value: `${onlineMembers.toLocaleString()}`, inline: true },
//                     { name: '🎉 Booster', value: `${boosters.toLocaleString()}`, inline: true },
//                     { name: '🏆 Boost Level', value: `Level ${boostLevel}`, inline: true },
//                     { name: '📅 Dibuat', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:D>`, inline: true },
//                     { name: '👑 Pemilik Server', value: `<@${guild.ownerId}>`, inline: true }
//                 )
//                 .setFooter({
//                     text: `Diminta oleh ${interaction.user.tag}`,
//                     iconURL: interaction.user.displayAvatarURL({ dynamic: true })
//                 })
//                 .setTimestamp();

//             const row = new ActionRowBuilder().addComponents(
//                 new ButtonBuilder()
//                     .setCustomId('refresh_stats')
//                     .setLabel('🔄 Refresh')
//                     .setStyle(ButtonStyle.Primary)
//             );

//             return { embeds: [embed], components: [row] };
//         };

//         const statsMessage = await interaction.editReply(await sendStats());

//         const collector = statsMessage.createMessageComponentCollector({
//             componentType: ComponentType.Button,
//             time: 60000, // 1 menit
//             filter: i => i.customId === 'refresh_stats' && i.user.id === interaction.user.id
//         });

//         collector.on('collect', async i => {
//             await i.deferUpdate();
//             await interaction.editReply(await sendStats());
//         });

//         collector.on('end', async () => {
//             const disabledRow = new ActionRowBuilder().addComponents(
//                 new ButtonBuilder()
//                     .setCustomId('refresh_stats')
//                     .setLabel('🔄 Refresh')
//                     .setStyle(ButtonStyle.Primary)
//                     .setDisabled(true)
//             );

//             await interaction.editReply({
//                 components: [disabledRow]
//             });
//         });
//     },

//     category: 'Information'
// };