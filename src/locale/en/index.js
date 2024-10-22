const common = require('./common');
const vpn_services = require('./vpn_services');
const transaction = require('./transaction');
const servers = require('./servers');
const subscription = require('./subscription');

module.exports = {
	common,
	vpn_services,
	transaction,
	servers,
	subscription,

	start: {
		greeting: '👋 Welcome to VPN Key Store!',
		btn: {
			buyVpnKey: '🔑 Купить VPN ключ',
			subscription: 'Подписка',
			servers: 'Сервера',
			support: '📞 Support',
			aboutUs: 'ℹ️ Privacy policy',
		},
	},
	errors: {
		global: 'Бот временно не доступен, пожалуйста, перезвоните позже',
	},
};
