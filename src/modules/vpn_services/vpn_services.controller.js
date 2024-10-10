const { TRIAL, MONTH, SIX_MONTHS, YEAR } = require('../../const/services');
const {
	provideVpnServices,
	getTrialPeriod,
	getPaidVpnService,
	getQRCode,
} = require('./vpn_services.service');

module.exports = (bot) => {
	/** Метод предоставления VPN услуг */
	bot.callbackQuery('vpn_services', provideVpnServices);

	/** Метод оформления пробного периода */
	bot.callbackQuery(TRIAL, getTrialPeriod);

	/** Метод оформления платных VPN подписок */
	bot.callbackQuery([MONTH, SIX_MONTHS, YEAR], getPaidVpnService);

	/** Метод получения QR кода */
	bot.callbackQuery('get_qr_code', getQRCode);
};
