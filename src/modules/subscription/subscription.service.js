const { InlineKeyboard } = require('grammy');
const { formatDate, getDiff } = require('../../utils/date');
const { logInfo, logError } = require('../../utils/logger');

const label = 'Subscription';

const getSubscription = async (ctx) => {
	logInfo('Providing subscription info', label, ctx);
	const { meta } = ctx.session;
	const tariff = meta.tariff || 'trial';
	const startDate = meta.startTariff || meta.startTrial;
	const endDate = meta.expireTariff || meta.expireTrial;
	const { days, hours, minutes } = getDiff(endDate);

	try {
		await ctx.answerCallbackQuery();
		await ctx.editMessageText(
			ctx.getLangText('subscription.info', {
				tariff: ctx.getLangText(`common.tariffs.${tariff}`),
				startDate: formatDate(startDate),
				days,
				hours,
				minutes,
			}),
			{
				reply_markup: new InlineKeyboard().text(
					ctx.getLangText('common.buttons.backToMenu'),
					'back_to_main_menu'
				),
			}
		);
	} catch (e) {
		logError('Message editing error', label, e);
	}
};

module.exports = {
	getSubscription,
};
