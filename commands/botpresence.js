const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { embedColor } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('botpresence')
        .setDescription('Change bot\'s current presence globally')
        .addStringOption(option => option.setName('activity').setDescription('Enter an activity').setRequired(true))
        .addStringOption(option => option.setName('type').setDescription('Select a type').setRequired(true).addChoice('Playing', 'PLAYING').addChoice('Listening', 'LISTENING').addChoice('Watching', 'WATCHING').addChoice('Competing', 'COMPETING'))
        .addStringOption(option => option.setName('status').setDescription('Select a status').setRequired(true).addChoice('Online', 'online').addChoice('Idle', 'idle').addChoice('Do Not Disturb', 'dnd').addChoice('Invisible', 'invisible')),
    cooldown: '25',
    guildOnly: true,
    execute (interaction) {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({ content: 'Error: You have no permission to use this command.' });

            const activityField = interaction.options.getString('activity');

            const typeField = interaction.options.getString('type');

                let resultType;
                    if (typeField === 'PLAYING') resultType = 'Playing';
                    if (typeField === 'LISTENING') resultType = 'Listening';
                    if (typeField === 'WATCHING') resultType = 'Watching';
                    if (typeField === 'COMPETING') resultType = 'Competing';

            const statusField = interaction.options.getString('status');

                let resultStatus;
                    if (statusField === 'online') resultStatus = 'Online';
                    if (statusField === 'idle') resultStatus = 'Idle';
                    if (statusField === 'dnd') resultStatus = 'Do Not Disturb';
                    if (statusField === 'invisible') resultStatus = 'Invisible';

            const embed = new MessageEmbed()
                .setTitle('Bot Presence')
                .setDescription('Successfully changed bot\'s current presence')
                .addFields(
                    { name: 'Activity', value: `${activityField}` },
                    { name: 'Type', value: `\`${resultType}\``, inline: true },
                    { name: 'Status', value: `\`${resultStatus}\``, inline: true }
                )
                .setColor(embedColor);

            interaction.client.user.setPresence({ activities: [{ name: `${activityField}`, type: `${typeField}` }], status: `${statusField}` });
                interaction.reply({ embeds: [embed] });
        }
};