const { logInfo, logError } = require('../../utils/logger');
const { API } = require('../../utils/api');
const serversServices = require('../servers/servers.service');
const path = require('node:path');
const fs = require('fs');
const os = require('os');

const label = 'Transaction';

/** Метод подтверждения оплаты */
const confirmPayment = async (ctx) => {
	// todo пинговать сервер
	logInfo('Payment confirmation', label, ctx);
	await ctx.answerPreCheckoutQuery(true);
};

/** Метод успешной оплаты */
const successfulPayment = async (ctx) => {
	logInfo('Payment was successful', label, ctx);
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

	const body = {
		tgPayId,
		providePayId,
		tgId,
		serviceCode,
		totalAmount,
		date,
	};

	try {
		logInfo('Saving a receipt', label, body);
		await API.post('payments', body);
	} catch (e) {
		logError('Error saving receipt', label, e);
		const log = `${JSON.stringify(body)}${os.EOL}`;
		fs.appendFile(
			path.resolve(__dirname, '../../logs/transaction.log'),
			log,
			'utf8',
			(err) => {
				if (err) {
					logError('Error writing log', label, err);
				} else {
					logInfo('Log saved successfully', label, err);
				}
			}
		);
	}

	try {
		logInfo('Deleting a payment message', label, ctx);
		await ctx.api.deleteMessage(
			ctx.session.invoice.chatId,
			ctx.session.invoice.msgId
		);
	} catch (e) {
		logError('Error deleting payment message', label, e);
	}

	// todo подумать как уведомить пользователя о покупке
	// ctx.reply(ctx.getLangText('transaction.title'));
	await serversServices.getServerList(ctx);
};

module.exports = {
	confirmPayment,
	successfulPayment,
};
