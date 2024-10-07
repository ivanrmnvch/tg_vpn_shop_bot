const { API } = require('../../utils/api');

module.exports = (bot) => {
	bot.on('pre_checkout_query', async (ctx) => {
		console.log('>>>>>>>> PRE CHECKOUT QUERY');
		const preCheckoutQuery = ctx.preCheckoutQuery; // Получаем объект PreCheckoutQuery

		console.log('preCheckoutQuery', preCheckoutQuery);

		// Здесь вы можете проверить, правильный ли запрос и подходит ли он вам
		// Например, можно проверить payload или другие параметры
		const isPaymentValid = true; // Замените это на вашу проверку

		if (isPaymentValid) {
			// Если всё хорошо, ответьте на PreCheckoutQuery
			await ctx.answerPreCheckoutQuery(true); // true означает успешное подтверждение
		} else {
			// Если что-то не так, можете отправить false
			await ctx.answerPreCheckoutQuery(false, {
				error_message:
					'Ошибка при обработке платежа. Пожалуйста, попробуйте ещё раз.',
			});
		}
	});

	bot.on('message:successful_payment', async (ctx) => {
		console.log('successful payment ctx', ctx);
		console.log('update', ctx.update);
		console.log('payment', ctx.update.message);
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

		await API.post('transaction', {
			tgPayId,
			providePayId,
			tgId,
			serviceCode,
			totalAmount,
			date,
		});
	});
};
