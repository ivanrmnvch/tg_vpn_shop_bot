const vpn_services = require('./vpn_services');

module.exports = {
	vpn_services,

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
