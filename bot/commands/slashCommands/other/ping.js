module.exports = {
	name: 'ping',
	description: 'Test to see if client is operational.',
	userPermissions: ['ADMINISTRATOR'],
	async execute(interaction) {
		await interaction.reply({ content: "Hello World"});
	},
};