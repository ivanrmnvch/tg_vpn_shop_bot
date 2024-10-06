const { getLocaleText } = require('../../../utils/getLocaleText');
const { InlineKeyboard } = require('grammy');
const services = require('../../../const/services');

module.exports = (lang) => {
	return Object.values(services).map((service) => ({
		text: getLocaleText(lang, `vpn_services.buttons.${service}`),
		event: service,
	}));
};

// const inlineKeyboard = new InlineKeyboard()
// 	.text(ctx.getLangText('buyVpnKey.btn.trial'), 'trial')
// 	.row()
// 	.text(ctx.getLangText('buyVpnKey.btn.month'), 'month')
// 	.row()
// 	.text(ctx.getLangText('buyVpnKey.btn.sixMonths'), 'six_months')
// 	.row()
// 	.text(ctx.getLangText('buyVpnKey.btn.year'), 'year');
