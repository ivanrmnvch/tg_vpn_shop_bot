const serversService = require('../servers/servers.service');

const servers = async (ctx) => {
	await serversService.getServerList(ctx);
};

module.exports = (bot) => bot.command('servers', servers);
