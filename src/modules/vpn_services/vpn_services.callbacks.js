const vpnServiceButtons = require('./buttons/vpn_service_buttons');
const { TRIAL, MONTH, SIX_MONTHS, YEAR } = require('../../const/services');
const prices = require('../../const/prices');

module.exports = (bot) => {
	/**
	 * Метод выбора VPN услуг
	 */
	bot.callbackQuery('vpn_services', async (ctx) => {
		ctx.answerCallbackQuery();
		ctx.reply(ctx.getLangText('vpn_services.title'), {
			reply_markup: vpnServiceButtons(ctx),
		});
	});

	/**
	 * Метод оформления пробного периода
	 */
	bot.callbackQuery(TRIAL, async (ctx) => {
		await ctx.replyWithInvoice(
			'Название товара', // Название товара
			'Описание товара', // Описание товара
			'test', // Уникальный идентификатор транзакции
			'RUB', // Валюта
			[{ label: 'Продукт 1', amount: 15000 }], // Цена
			{
				provider_token: '381764678:TEST:97121',
			}
		);
	});

	/**
	 * Метод оформления платных VPN подписок
	 */
	bot.callbackQuery([MONTH, SIX_MONTHS, YEAR], async (ctx) => {
		console.log('ctx callback_query', ctx);
		console.log('ctx callback_query.update', ctx.update);
		const service = ctx.update.callback_query.data;

		await ctx.replyWithInvoice(
			ctx.getLangText(`vpn_services.headers.${service}`),
			ctx.getLangText('vpn_services.description'),
			service,
			'RUB',
			[
				{
					label: ctx.getLangText(`vpn_services.labels.${service}`),
					amount: prices[service],
				},
			],
			{
				provider_token: ctx.config.PROVIDER_TOKEN_TEST,
			}
		);
	});
};
