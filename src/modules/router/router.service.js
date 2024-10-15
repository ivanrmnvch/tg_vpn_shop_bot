const serversService = require('../servers/servers.service');
const vpnServicesService = require('../vpn_services/vpn_services.service');

const servers = async (ctx) => {
	await serversService.getServerList(ctx);
};

const tariffs = (ctx) => {
	vpnServicesService.provideVpnServices(ctx);
};

module.exports = {
	servers,
	tariffs,
};
