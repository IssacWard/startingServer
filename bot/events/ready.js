const roleClaim = require('../tools/role-claim')

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setActivity('Watching You');
		roleClaim(client);
	}
};