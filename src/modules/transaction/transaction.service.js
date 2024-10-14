const { logInfo, logError } = require('../../utils/logger');
const { API } = require('../../utils/api');
const { PAGINATION_LIMIT } = require('../../config/envConfig').app;
// const vpnServices = require('../vpn_services/vpn_services.service');
const serversServices = require('../servers/servers.service');

/** Метод подтверждения оплаты */
const confirmPayment = async (ctx) => {
	console.log('confirmPayment ctx', ctx);
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

	try {
		// todo
		await ctx.api.deleteMessage(
			ctx.session.invoice.chatId,
			ctx.session.invoice.msgId
		);
	} catch (e) {
		console.error(e);
	}

	// ctx.reply(ctx.getLangText('transaction.title'));
	await serversServices.getServerList(ctx);
};

module.exports = {
	confirmPayment,
	successfulPayment,
};
