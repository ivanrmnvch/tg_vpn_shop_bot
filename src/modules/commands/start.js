const { InlineKeyboard } = require('grammy');
const { logInfo } = require('../../utils/logger');

const start = (ctx) => {
	logInfo('Get started', start.name, ctx);
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
};

module.exports = (bot) => bot.command('start', start);
