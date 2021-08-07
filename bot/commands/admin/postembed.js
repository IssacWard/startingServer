const ce = require("../../tools/customembeds.js")
const builder = require("../../tools/embedbuilder.js")
const axios = require('axios');
const Discord = require('discord.js');

module.exports = {
	name: 'postembed',
	description: 'Bot Message',
	args: true,
	execute(message, args) {
		ce.onebyname(args[0])
			.then((res) => {
				const embed = builder(res);
				return message.channel.send(embed);
			});
	},
};