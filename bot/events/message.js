const Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
	name: 'message',
	execute(message, client) {
        // IF NO PREFIX, OR IS BOT, STOP READING MESSAGE //
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        // CREATES ARRAY & COMMAND //
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        // ASSIGNS COMMAND //
        const command = client.commands.get(commandName)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

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

        // PERMISSION CHECKER //
        if (command.permissions) {
            const authorPerms = message.channel.permissionsFor(message.author);

            if (!authorPerms || !authorPerms.has(command.permissions)) {
                return message.reply('You cannot do this!');
            }
        }

        // SERVER ONLY CHECKER //
        if (command.guildOnly && message.channel.type === 'dm') {
            return message.reply('I can\'t execute that command inside DMs!');
        }

        // COOLDOWN CHECKER //
        client.cooldowns = new Discord.Collection();
        const { cooldowns } = client;

        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        // ------------------- Checkers -------------------//

        // ------------------- Execute Command -------------------//
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