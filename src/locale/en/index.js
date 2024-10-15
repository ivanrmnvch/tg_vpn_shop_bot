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
		greeting:
			"👋 Welcome to VPN Key Store!\n\nSelect the option you're interested in below to get started.",
		callGreeting: 'VPN Key Store 🔷 Главное меню',
		btn: {
			buyVpnKey: '🔑 Купить VPN ключ',
			subscription: 'Подписка',
			servers: 'Сервера',
			myAccount: '👤 Мой аккаунт',
			support: '📞 Техподдержка',
			aboutUs: 'ℹ️ О нас',
		},
	},
};
