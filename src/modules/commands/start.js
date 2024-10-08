const { InlineKeyboard } = require('grammy');

module.exports = (bot) => {
	bot.command('start', (ctx) => {
		console.log('11111');
		const inlineKeyboard = new InlineKeyboard().text(
			ctx.getLangText('start.btn.buyVpnKey'),
			// ctx.getLangText('start.btn.buyVpnKey'),
			'vpn_services'
		);
		console.log('22222');
		// .row()
		// .text(ctx.getLangText('start.btn.myAccount'), 'my_account')
		// .row()
		// .text(ctx.getLangText('start.btn.support'), 'support')
		// .row()
		// .text(ctx.getLangText('start.btn.aboutUs'), 'about_us');

		console.log(
			"ctx.getLangText('start.greeting')",
			ctx.getLangText('start.greeting')
		);
		console.log('inlineKeyboard', inlineKeyboard);

		ctx.reply(ctx.getLangText('start.greeting'), {
			reply_markup: inlineKeyboard,
		});
		console.log('333');
	});
};
