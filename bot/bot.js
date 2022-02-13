const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const { token, id, guildid, roleid } = require('./config.json');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandSubcommandBuilder } = require('@discordjs/builders');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// ------------------- Slash Command Manager -------------------//

client.slashCommands = new Collection();

const commands = [];
const slashCommandFolders= fs.readdirSync('./commands/slashCommands');
const rest = new REST({ version: '9' }).setToken(token);

for (const folder of slashCommandFolders) {
    const slashCommandFiles = fs.readdirSync(`./commands/slashCommands/${folder}`).filter(file => file.endsWith('.js'));

	for (const file of slashCommandFiles) {
		const slashCommand = require(`./commands/slashCommands/${folder}/${file}`);
		client.slashCommands.set(slashCommand.name, slashCommand );
		if(slashCommand.userPermissions) slashCommand.defaultPermission = false;
		commands.push(slashCommand);
	}
}

(async () => {
	try {
		client.on('ready', () =>{
			console.log('Started refreshing application (/) commands.');
		
			const guild = client.guilds.cache.get(guildid);
			guild.commands.set(commands)
				.then((cmd) => {
					const getRoles = (commandName) => {
						const permissions = commands.find((x) => x.name === commandName).userPermissions;

						if(!permissions) return null;
						return guild.roles.cache.filter((x) => x.permissions.has(permissions) && !x.managed);
					};

					const fullPermissions = cmd.reduce((accumulator, x) => {
						const roles = getRoles(x.name);
						if(!roles) return accumulator;

						const permissions = roles.reduce((a, v) => {
							return [
								...a,
								{
									id: v.id,
									type: 'ROLE',
									permission: true,
								}
							]
						},[]);

						return [
							...accumulator,
							{
								id: x.id,
								permissions,
							},
						];
					}, []);

					guild.commands.permissions.set({fullPermissions});

				});
		
			console.log('Successfully reloaded application (/) commands.');
		})
	} 
	catch (error) {
		console.error(error);
	}
})();

// ------------------- Slash Command Manager -------------------//



// ------------------- Message Command Manager -------------------//

client.messageCommands = new Collection();

const messageCommandFolders= fs.readdirSync('./commands/messageCommands');

for (const folder of messageCommandFolders) {
    const messageCommandFiles = fs.readdirSync(`./commands/messageCommands/${folder}`).filter(file => file.endsWith('.js'));

	for (const file of messageCommandFiles) {
		const messageCommand = require(`./commands/messageCommands/${folder}/${file}`);
		client.messageCommands.set(messageCommand.name, messageCommand );
	}
}

// ------------------- Message Command Manager -------------------//


// ------------------- Event Manager -------------------//

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} 
	else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
};

// ------------------- Event Manager -------------------//

// -------------------  Discord Bot Start -------------------  //

client.login(token);

// -------------------  Discord Bot Start -------------------  //