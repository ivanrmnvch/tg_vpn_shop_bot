const { TRIAL, MONTH, SIX_MONTHS, YEAR } = require('../../../const/services');
const { InlineKeyboard } = require('grammy');

module.exports = (ctx) => {
	const instance = new InlineKeyboard();
	if (ctx.session.meta.newUser) {
		instance
			.text(ctx.getLangText(`vpn_services.buttons.${TRIAL}`), TRIAL)
			.row();
	}
	return instance
		.text(ctx.getLangText(`vpn_services.buttons.${MONTH}`), MONTH)
		.row()
		.text(ctx.getLangText(`vpn_services.buttons.${SIX_MONTHS}`), SIX_MONTHS)
		.row()
		.text(ctx.getLangText(`vpn_services.buttons.${YEAR}`), YEAR)
		.row();
};
