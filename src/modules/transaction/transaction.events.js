const { InlineKeyboard } = require('grammy');
const { API } = require('../../utils/api');

module.exports = (bot) => {
	/**
	 * Метод подтверждения оплаты
	 */
	bot.on('pre_checkout_query', async (ctx) => {
		await ctx.answerPreCheckoutQuery(true);
	});

	/**
	 * Метод успешной оплаты
	 */
	bot.on('message:successful_payment', async (ctx) => {
		const {
			from: { id: tgId },
			date,
			successful_payment: {
				telegram_payment_charge_id: tgPayId,
				provider_payment_charge_id: providePayId,
				invoice_payload: serviceCode,
				total_amount: totalAmount,
			},
		} = ctx.update.message;

		/** Сохраняем чек */
		await API.post('transaction', {
			tgPayId,
			providePayId,
			tgId,
			serviceCode,
			totalAmount,
			date,
		});

		ctx.reply(ctx.getLangText('transaction.title'), {
			reply_markup: new InlineKeyboard().text(
				ctx.getLangText('transaction.button'),
				'get_qr_code'
			),
		});
	});
};
