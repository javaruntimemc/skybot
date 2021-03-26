const { MessageEmbed } = require('discord.js');
const { embedColor } = require('../config.json');

module.exports = {
	name: 'avatar',
	description: 'Get the avatar URL of the tagged user(s), or your own avatar',
	cooldown: '5',
	usage: '{@user}',
	execute (message) {
		if (!message.mentions.users.size) {
		const embed = new MessageEmbed()
			.setTitle('Avatar')
			.setDescription(`Your Avatar:\n https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.jpeg`)
			.setImage(`${message.author.displayAvatarURL({ dynamic: true })}`)
			.setColor(embedColor);
		message.channel.send(embed);
	}
		if (message.mentions.users.size) {
		const taggedUser = message.mentions.users.first();
		const userAvatar = message.mentions.users.map(user => `${user.displayAvatarURL({ dynamic: true })}`);
		const embed2 = new MessageEmbed()
			.setTitle('Avatar')
			.setDescription(`${taggedUser}'s Avatar:\n https://cdn.discordapp.com/avatars/${taggedUser.id}/${taggedUser.avatar}.jpeg`)
			.setImage(`${userAvatar}`)
			.setColor(embedColor);
		message.channel.send(embed2);
		}
	}
};