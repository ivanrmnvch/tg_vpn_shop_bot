const { logInfo } = require('../../utils/logger');
const { InlineKeyboard } = require('grammy');

const label = 'Account';

const getMyAccount = (ctx) => {
	logInfo('Providing account', label, ctx);
	ctx.answerCallbackQuery();
	ctx.reply(ctx.getLangText('vpn_services.title'), {
		reply_markup: new InlineKeyboard().text(ctx.getLangText()),
	});
};

module.exports = {};
