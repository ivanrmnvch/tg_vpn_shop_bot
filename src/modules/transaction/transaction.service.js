const { logInfo, logError } = require('../../utils/logger');
const { API } = require('../../utils/api');
const { InlineKeyboard } = require('grammy');

/** Метод подтверждения оплаты */
const confirmPayment = async (ctx) => {
	logInfo('Payment confirmation', confirmPayment.name, ctx);
	await ctx.answerPreCheckoutQuery(true);
};

/** Метод успешной оплаты */
const successfulPayment = async (ctx) => {
	logInfo('Payment was successful', successfulPayment.name, ctx);
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

	try {
		logInfo('Saving a receipt', successfulPayment.name);
		await API.post('transaction', {
			tgPayId,
			providePayId,
			tgId,
			serviceCode,
			totalAmount,
			date,
		});
	} catch (e) {
		logError('Error saving receipt', successfulPayment.name, e);
		// todo что делать в случае ошибки???
	}

	ctx.reply(ctx.getLangText('transaction.title'), {
		reply_markup: new InlineKeyboard().text(
			ctx.getLangText('transaction.button'),
			'get_qr_code'
		),
	});
};

module.exports = {
	confirmPayment,
	successfulPayment,
};
