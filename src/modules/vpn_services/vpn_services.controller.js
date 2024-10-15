const vpnServicesService = require('./vpn_services.service');

module.exports = (bot) => {
	/** Метод предоставления VPN услуг */
	bot.callbackQuery('vpn_services', vpnServicesService.provideVpnServices);

	/** Метод оформления пробного периода */
	bot.callbackQuery('trial', vpnServicesService.getTrialPeriod);

	/** Метод оформления платных VPN подписок */
	bot.callbackQuery(
		['month', 'six_months', 'year'],
		vpnServicesService.getPaidVpnService
	);
};
