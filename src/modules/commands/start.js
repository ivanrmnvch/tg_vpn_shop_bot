const { InlineKeyboard } = require('grammy');
const { logInfo, logError } = require('../../utils/logger');

const label = 'Start';

const start = async (ctx) => {
	logInfo('Get started', label, ctx);
	const buttons = new InlineKeyboard()
		.text(ctx.getLangText('start.btn.buyVpnKey'), 'vpn_services')
		.row();

	if (ctx.session.meta.activeTrial || ctx.session.meta.activeTariff) {
		buttons
			.text(ctx.getLangText('start.btn.subscription'), 'subscription')
			.row()
			.text(ctx.getLangText('start.btn.servers'), 'servers:5:0')
			.row()
			.text(ctx.getLangText('start.btn.support'), 'support')
			.text(ctx.getLangText('start.btn.aboutUs'), 'about_us');
	}

	if (ctx.update.callback_query?.message?.photo) {
		try {
			logInfo('Return to main menu from QR code', label, ctx);
			await ctx.deleteMessage();
			await ctx.reply(ctx.getLangText('start.greeting'), {
				reply_markup: buttons,
			});
		} catch (e) {
			logError('Error returning to main menu from QR code', label, e);
		}
		return;
	}

	if (ctx.update.callback_query?.message?.text) {
		try {
			logInfo('Return to main menu from message');
			await ctx.answerCallbackQuery();
			await ctx.editMessageText(ctx.getLangText('start.greeting'), {
				reply_markup: buttons,
			});
		} catch (e) {
			logError('Error returning to main menu from message', label, e);
		}
		return;
	}

	await ctx.reply(ctx.getLangText('start.greeting'), {
		reply_markup: buttons,
	});
};

module.exports = start;
