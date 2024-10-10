const { logInfo, logError } = require('../../utils/logger');
const { PROVIDER_TOKEN_TEST } = require('../../config/envConfig').config;
const { generateQRCode } = require('./helpers');
const prices = require('../../const/prices');
const vpnServiceButtons = require('./buttons/vpn_service_buttons');

/** Метод выбора VPN услуг */
const provideVpnServices = (ctx) => {
	logInfo('Providing vpn services', provideVpnServices.name, ctx);
	ctx.answerCallbackQuery();
	ctx.reply(ctx.getLangText('vpn_services.title'), {
		reply_markup: vpnServiceButtons(ctx),
	});
};

/** Метод оформления пробного периода */
const getTrialPeriod = async (ctx) => {
	logInfo('Getting trial period', getTrialPeriod.name, ctx);
	if (!ctx.session.meta.newUser) {
		ctx.reply(ctx.getLangText('vpn_services.trialIsBlock'));
		return;
	}
	try {
	} catch (e) {
		logError();
	}
	// const { id } = Object.values(ctx.update).pop().from;
	// const qrCode = await generateQRCode(id, 'nl_01');
	// await ctx.replyWithPhoto(qrCode, {
	// 	caption: 'test',
	// });
};

/** Метод оформления платных VPN подписок */
const getPaidVpnService = async (ctx) => {
	logInfo('Getting paid VPN service', getPaidVpnService.name, ctx);
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
			provider_token: PROVIDER_TOKEN_TEST,
		}
	);
};

/** Метод получения QR кода */
const getQRCode = async (ctx) => {
	logInfo('Getting QR code', getQRCode.name, ctx);
	const { id } = Object.values(ctx.update).pop().from;
	const qrCode = await generateQRCode(id, 'nl_01');
	await ctx.replyWithPhoto(qrCode, {
		caption: 'test',
	});
};

module.exports = {
	provideVpnServices,
	getTrialPeriod,
	getPaidVpnService,
	getQRCode,
};
