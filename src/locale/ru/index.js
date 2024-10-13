const common = require('./common');
const vpn_services = require('./vpn_services');
const transaction = require('./transaction');
const servers = require('./servers');

module.exports = {
	common,
	vpn_services,
	transaction,
	servers,

	start: {
		greeting:
			'👋 Добро пожаловать в VPN Key Store!\n\nВыберите интересующую вас опцию ниже, чтобы начать.',
		btn: {
			buyVpnKey: '🔑 Купить VPN ключ',
			myAccount: '👤 Мой аккаунт',
			support: '📞 Техподдержка',
			aboutUs: 'ℹ️ О нас',
		},
	},
};
