const fighttime = require("../../../tools/fight.js")

module.exports = {
	name: 'fight',
	description: 'f i g h t.',
	userPermissions: ['ADMINISTRATOR'],
	execute(interaction) {
		interaction.reply({ content: "Raises fists, you first sonney boy"});
		fighttime(interaction);	
	},
};