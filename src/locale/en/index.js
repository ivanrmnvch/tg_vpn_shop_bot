const vpn_services = require('./vpn_services');
const transaction = require('./transaction');

module.exports = {
	vpn_services,
	transaction,

	start: {
		greeting:
			"👋 Welcome to VPN Key Store!\n\nSelect the option you're interested in below to get started.",
		btn: {
			buyVpnKey: '🔑 Купить VPN ключ',
			myAccount: '👤 Мой аккаунт',
			support: '📞 Техподдержка',
			aboutUs: 'ℹ️ О нас',
		},
	},
};
