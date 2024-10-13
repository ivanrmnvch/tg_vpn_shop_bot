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

	// /** Метод получения QR кода */
	// bot.callbackQuery('get_qr_code', vpnServicesService.getQRCode);

	// /** Метод выбора операционной системы */
	// bot.callbackQuery('operating_systems', vpnServicesService.getOS);

	// /** Метод получения android приложения */
	// bot.callbackQuery('android_app');
	//
	// /** Метод получения ios приложения */
	// bot.callbackQuery('ios_app');
};
