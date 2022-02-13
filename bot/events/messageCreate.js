const { prefix } = require('../config.json');

module.exports = {
	name: 'messageCreate',
	execute(message, client) {
        // IF NO PREFIX, OR IS BOT, STOP READING MESSAGE //
        if (!message.content.startsWith(prefix) || message.author.bot || !message.guild) return;
        
        // CREATES ARRAY & COMMAND //
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        // ASSIGNS COMMAND //
        const command = client.messageCommands.get(commandName)
            || client.messageCommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        // ------------------- Checkers -------------------//
        // COMMAND CHECKER //
        if (!command) {
            return message.channel.send(`There's no such command, ${message.author}!`);
        }

        // ARGS CHECKER //
        if (command.args && !args.length) {
            let reply =  `You didn't provide any arguments, ${message.author}!`;
        
            if (command.usage) {
                reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            }
                
            return message.channel.send(reply);
        }

        try {
            command.execute(message, args);
        }
        catch(error) {
            console.error(error);
            message.reply('There was an error trying to execute that command.');
        }
        // ------------------- Execute Command -------------------//

    },
};