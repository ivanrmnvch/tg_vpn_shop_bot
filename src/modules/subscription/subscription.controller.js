const subscriptionService = require('./subscription.service');

module.exports = (bot) => {
	/** Метод получения информации о текущей подписке */
	bot.callbackQuery('subscription', subscriptionService.getSubscription);
};
