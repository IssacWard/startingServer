const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client(); 
const config = require('./config.json');

// ------------------- Command Manager -------------------//
client.commands = new Discord.Collection();

const commandFolders= fs.readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}
// ------------------- Command Manager -------------------//

// ------------------- Event Manager -------------------//
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args,client));
	} else {
		client.on(event.name, (...args) => event.execute(...args,client));
	}
}
// ------------------- Event Manager -------------------//

//  ------------------- Errors  ------------------- //

process.on('unhandledRejection', err => {
	console.error('Unhandled promise rejection:', err);
});

// --------------------------------------- //

// -------------------  Discord Bot Start -------------------  //

client.login(config.token)

// --------------------------------------- //