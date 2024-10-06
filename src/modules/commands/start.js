const { InlineKeyboard } = require('grammy');
module.exports = (bot) => {
	bot.command('start', (ctx) => {
		console.log('>>> START CONTEXT', ctx.session);

		// todo функция для построения кнопок, передавать конфиги
		const inlineKeyboard = new InlineKeyboard().text(
			ctx.getLangText('start.btn.buyVpnKey'),
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
