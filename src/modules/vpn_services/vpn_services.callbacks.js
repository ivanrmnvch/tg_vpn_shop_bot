const bot = require('../../app');
const btnConfig = require('./config/vpn_service_buttons');

module.exports = (bot) => {
	bot.callbackQuery('vpn_services', (ctx) => {
		console.log('config', btnConfig('ru'));

		// const inlineKeyboard = new InlineKeyboard()
		// 	.text(ctx.getLangText('buyVpnKey.btn.trial'), 'trial')
		// 	.row()
		// 	.text(ctx.getLangText('buyVpnKey.btn.month'), 'month')
		// 	.row()
		// 	.text(ctx.getLangText('buyVpnKey.btn.sixMonths'), 'six_months')
		// 	.row()
		// 	.text(ctx.getLangText('buyVpnKey.btn.year'), 'year');
		// ctx.answerCallbackQuery(); // Закрыть всплывающее уведомление
		// ctx.reply('Выберите тариф', {
		// 	reply_markup: inlineKeyboard,
		// });
	});
};
