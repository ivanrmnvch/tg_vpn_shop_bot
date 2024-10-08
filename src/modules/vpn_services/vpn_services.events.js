const { InputFile } = require('grammy');
const stream = require('stream');
const { API } = require('../../utils/api');

module.exports = (bot) => {
	// /**
	//  * Метод подтверждения оплаты
	//  */
	// bot.on('pre_checkout_query', async (ctx) => {
	// 	await ctx.answerPreCheckoutQuery(true);
	// });
	//
	// /**
	//  * Метод успешной оплаты
	//  */
	// bot.on('message:successful_payment', async (ctx) => {
	// 	const {
	// 		from: { id: tgId },
	// 		date,
	// 		successful_payment: {
	// 			telegram_payment_charge_id: tgPayId,
	// 			provider_payment_charge_id: providePayId,
	// 			invoice_payload: serviceCode,
	// 			total_amount: totalAmount,
	// 		},
	// 	} = ctx.update.message;
	//
	// 	/** Сохраняем чек */
	// 	await API.post('transaction', {
	// 		tgPayId,
	// 		providePayId,
	// 		tgId,
	// 		serviceCode,
	// 		totalAmount,
	// 		date,
	// 	});
	//
	// 	const QRCodeStream = await API.get('vpn-services', {
	// 		params: {
	// 			id: tgId,
	// 			code: 'nl_01',
	// 		},
	// 		responseType: 'stream',
	// 	});
	//
	// 	const passThroughStream = new stream.PassThrough();
	// 	QRCodeStream.pipe(passThroughStream);
	//
	// 	ctx.reply('Спасибо за покупку!');
	// });
};
