const vpnServiceButtons = require('./buttons/vpn_service_buttons');
const { TRIAL, MONTH, SIX_MONTHS, YEAR } = require('../../const/services');
const prices = require('../../const/prices');
const { InputFile } = require('grammy');
const { getQRCode } = require('./utils/getQRCode');

module.exports = (bot) => {
	/**
	 * Метод выбора VPN услуг
	 */
	bot.callbackQuery('vpn_services', (ctx) => {
		ctx.answerCallbackQuery();
		ctx.reply(ctx.getLangText('vpn_services.title'), {
			reply_markup: vpnServiceButtons(ctx),
		});
	});

	/**
	 * Метод оформления пробного периода
	 */
	bot.callbackQuery(TRIAL, async (ctx) => {
		const { id } = Object.values(ctx.update).pop().from;
		const qrCode = await getQRCode(id, 'nl_01');
		await ctx.replyWithPhoto(qrCode, {
			caption: 'test',
		});
	});

	/**
	 * Метод оформления платных VPN подписок
	 */
	bot.callbackQuery([MONTH, SIX_MONTHS, YEAR], async (ctx) => {
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

	bot.callbackQuery('get_qr_code', async (ctx) => {
		const { id } = Object.values(ctx.update).pop().from;
		const qrCode = await getQRCode(id, 'nl_01');
		await ctx.replyWithPhoto(qrCode, {
			caption: 'test',
		});
	});
};
