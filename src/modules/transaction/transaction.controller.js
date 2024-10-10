const { confirmPayment, successfulPayment } = require('./transaction.service');

module.exports = (bot) => {
	/** Метод подтверждения оплаты */
	bot.on('pre_checkout_query', confirmPayment);

	/** Метод успешной оплаты */
	bot.on('message:successful_payment', successfulPayment);
};
