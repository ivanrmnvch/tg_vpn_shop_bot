const { InlineKeyboard } = require('grammy');
const { logInfo } = require('../../utils/logger');

const start = (ctx) => {
	logInfo('Get started', start.name, ctx);
	const buttons = new InlineKeyboard();

	// .text(ctx.getLangText('start.btn.buyVpnKey'), 'vpn_services')
	// .row()
	// .text(ctx.getLangText('start.btn.myAccount'), 'my_account');
	//.text(ctx.getLangText('start.btn.myAccount'), 'my_account');
	// .row()
	// .text(ctx.getLangText('start.btn.support'), 'support')
	// .row()
	// .text(ctx.getLangText('start.btn.aboutUs'), 'about_us');

	if (ctx.update.callback_query) {
		ctx.answerCallbackQuery();
		ctx.editMessageText(ctx.getLangText('start.callGreeting'), {
			reply_markup: buttons,
		});
	} else {
		ctx.reply(ctx.getLangText('start.greeting'), {
			reply_markup: buttons,
		});
	}
};

module.exports = start;
