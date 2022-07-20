const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { embedColor } = require('../config.json');
const noPermission = require('../errors/noPermission.js');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('roleremove')
        .setDescription('Remove a role from the selected user')
        .addUserOption(option => option.setName('user').setDescription('Select a user').setRequired(true))
        .addRoleOption(option => option.setName('role').setDescription('Select a role').setRequired(true)),
    cooldown: '5',
    guildOnly: true,
    execute (interaction) {
        if (!interaction.guild.members.me.permissions.has('ManageRoles')) return interaction.reply({ content: 'Error: Bot permission denied. Enable **Manage Roles** permission in `Server Settings > Roles` to use this command.' });
        if (!interaction.member.permissions.has('ManageRoles')) return interaction.reply({ embeds: [noPermission] });

        const userField = interaction.options.getMember('user');

            if (userField === interaction.member) return interaction.reply({ content: 'Error: You cannot remove a role from yourself.' });

        const roleField = interaction.options.getRole('role');
            if (!userField.roles.cache.has(roleField.id)) return interaction.reply({ content: 'Error: Selected user doesn\'t have that role.' });

            if (roleField === interaction.guild.roles.cache.find(role => role.name === '@everyone')) {
                interaction.reply({ content: 'Error: This role cannot be removed from the user.' });
            }
            else {
                const embed = new EmbedBuilder()
                    .setDescription(`Successfully removed **${roleField}** role from **${userField}** user`)
                    .setColor(embedColor);
                interaction.reply({ embeds: [embed] }).then(userField.roles.remove(roleField.id));
            }
        }
};