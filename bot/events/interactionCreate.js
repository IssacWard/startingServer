module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
        // ------------------- Command Manager -------------------//
        if (interaction.isCommand()){
            const command = client.slashCommands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(interaction);
            } 
            catch (err) {
                console.error(err);
                await interaction.reply({
                    content: 'There was an error while executing this command!', 
                    ephemeral: true
                });
            }
        }  
        // ------------------- Command Manager -------------------//

        // ------------------- Button Manager -------------------//
        if (interaction.isButton()){
            interaction.reply({ content: `${interaction.user.tag} clicked me!`});

        }
        // ------------------- Button Manager -------------------//

        // ------------------- Menu Manager -------------------//
        if (interaction.isSelectMenu()){
            interaction.reply({ content: `${interaction.user.tag} clicked me!`});
        }
        // ------------------- Menu Manager -------------------//
	},
};