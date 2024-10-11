const { logInfo, logError } = require('../../utils/logger');
const { PROVIDER_TOKEN_TEST } = require('../../config/envConfig').config;
const { generateQRCode } = require('./helpers');
const prices = require('../../const/prices');
const vpnServiceButtons = require('./buttons/vpn_service_buttons');
const { API } = require('../../utils/api');
const redisClient = require('../../config/redisClient');
const { InlineKeyboard } = require('grammy');

const label = 'vpnServices';

/** Метод выбора VPN услуг */
const provideVpnServices = (ctx) => {
	logInfo('Providing vpn services', label, ctx);
	ctx.answerCallbackQuery();
	ctx.reply(ctx.getLangText('vpn_services.title'), {
		reply_markup: vpnServiceButtons(ctx),
	});
};

/** Метод оформления пробного периода */
const getTrialPeriod = async (ctx) => {
	logInfo('Getting trial period', label, ctx);

	if (!ctx.session.meta.newUser) {
		ctx.answerCallbackQuery();
		ctx.reply(ctx.getLangText('vpn_services.trialIsBlock'));
		return;
	}

	const { id } = ctx.session.meta;

	try {
		logInfo('User trial update', label, { id });
		await API.post(`user/${id}/trial`);
	} catch (e) {
		logError('User trial update error', label, e);
		ctx.answerCallbackQuery();
		ctx.reply(ctx.getLangText('vpn_services.trialUpdateError'));
		return;
	}

	try {
		logInfo('Update user session', label, { id });
		ctx.session.meta.newUser = false;
		redisClient.set(id, JSON.stringify(ctx.session));
	} catch (e) {
		logError('Error updating user session', label, e);
	}

	ctx.reply(ctx.getLangText('vpn_services.trialSuccess'));
	await getQRCode(ctx);
};

/** Метод оформления платных VPN подписок */
const getPaidVpnService = async (ctx) => {
	logInfo('Getting paid VPN service', label, ctx);

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
	logInfo('Getting QR code', label, ctx);

	const { id } = ctx.session.meta;
	const qrCode = await generateQRCode(id, 'nl_01');

	ctx.answerCallbackQuery();
	await ctx.replyWithPhoto(qrCode, {
		caption: ctx.getLangText('vpn_services.qrCodeDescription'),
		reply_markup: new InlineKeyboard().text(
			ctx.getLangText('common.buttons.continue'),
			'operating_systems'
		),
	});
};

module.exports = {
	provideVpnServices,
	getTrialPeriod,
	getPaidVpnService,
	getQRCode,
};
