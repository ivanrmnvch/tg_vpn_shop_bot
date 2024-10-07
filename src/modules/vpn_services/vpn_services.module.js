const vpnServiceCallbacks = require('./vpn_services.callbacks');
const vpnServicesEvents = require('./vpn_services.events');

module.exports = (bot) => {
	vpnServiceCallbacks(bot);
	vpnServicesEvents(bot);
};
