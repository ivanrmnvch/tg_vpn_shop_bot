const {
	app: { prices, numberOfMonths },
} = require('../../../config/envConfig');
const { InlineKeyboard } = require('grammy');

module.exports = (ctx) => {
	const instance = new InlineKeyboard();
	if (ctx.session.meta.newUser) {
		instance.text(ctx.getLangText('vpn_services.buttons.trial'), 'trial').row();
	}
	return instance
		.text(
			ctx.getLangText('vpn_services.buttons.month', {
				price: prices.month / 100,
				priceMonth: (prices.month / numberOfMonths.month / 100).toFixed(),
			}),
			'month'
		)
		.row()
		.text(
			ctx.getLangText('vpn_services.buttons.six_months', {
				price: prices.six_months / 100,
				priceMonth: (
					prices.six_months /
					numberOfMonths.six_months /
					100
				).toFixed(),
			}),
			'six_months'
		)
		.row()
		.text(
			ctx.getLangText('vpn_services.buttons.year', {
				price: prices.year / 100,
				priceMonth: (prices.year / numberOfMonths.year / 100).toFixed(),
			}),
			'year'
		)
		.row()
		.text(ctx.getLangText('common.buttons.backToMenu'), 'back_to_main_menu');
};
