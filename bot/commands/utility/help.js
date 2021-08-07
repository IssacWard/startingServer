const { prefix } = require('../../config.json');

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
        const data = [];
		const { commands } = message.client;

        // ------------------- For All Commands -------------------//
		if (!args.length) {
			data.push('Here\'s a list of all commands:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);
            
            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                        message.reply('I\'ve sent you a DM with all my commands!');
                    })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('It seems like I can\'t DM you! Do you have DMs disabled?');
                });
		}
        // ------------------- For All Commands -------------------//

        // ------------------- For One Command -------------------//
        // ASSIGNS COMMAND //
        const commandName = args[0].toLowerCase();
        const command = commands.get(commandName)
            || commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        // COMMAND CHECKER //
        if (!command) {
            return message.reply('There\'s no such command!');
        }

        // MESSAGE CREATOR //
        data.push(`**Name:** ${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        message.channel.send(data, { split: true });
        // ------------------- For One Command -------------------//
	},
};