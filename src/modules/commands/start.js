const { InlineKeyboard } = require('grammy');
module.exports = (bot) => {
	bot.command('start', (ctx) => {
		const inlineKeyboard = new InlineKeyboard().text(
			ctx.getLangText('start.btn.buyVpnKey'),
			// ctx.getLangText('start.btn.buyVpnKey'),
			'vpn_services'
		);
		// .row()
		// .text(ctx.getLangText('start.btn.myAccount'), 'my_account')
		// .row()
		// .text(ctx.getLangText('start.btn.support'), 'support')
		// .row()
		// .text(ctx.getLangText('start.btn.aboutUs'), 'about_us');

		ctx.reply(ctx.getLangText('start.greeting'), {
			reply_markup: inlineKeyboard,
		});
	});
};
