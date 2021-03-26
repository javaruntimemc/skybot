const { MessageEmbed } = require('discord.js');
const { embedColor } = require('../config.json');

module.exports = {
    name: 'setnick',
    description: 'Change other user\'s nickname',
    cooldown: '8',
    usage: '{@user} {nickname}',
    guildOnly: true,
    execute (message, args) {
		if (!message.member.hasPermission('MANAGE_NICKNAMES')) return message.channel.send('You have no permission to use this command.');
			const user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
                if (user.hasPermission('MANAGE_NICKNAMES')) return message.reply('This user\'s nickname cannot be changed.');

            const nickname = args.join(' ').slice(22);
            if (!nickname) {
                return message.channel.send('Please enter a username to change.');
            }

            const embed = new MessageEmbed()
                .setTitle('Nickname')
                .setDescription(`User ${user}'s nickname has been changed!`)
                .setColor(embedColor)
                .setTimestamp();
            message.channel.send(embed).then(user.setNickname(nickname));
        }
    };