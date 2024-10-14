const vpnServicesService = require('../vpn_services/vpn_services.service');

const tariffs = (ctx) => {
	vpnServicesService.provideVpnServices(ctx);
};

module.exports = tariffs;
