const { logInfo, logError } = require('../../utils/logger');
const {
	app: {
		ANDROID_APP_URL,
		IOS_APP_URL,
		PAGINATION_LIMIT,
		prices,
		numberOfMonths,
	},
	tg: { PROVIDER_TOKEN_TEST },
} = require('../../config/envConfig');
const { generateQRCode } = require('./helpers');
// const prices = require('../../const/prices');
const vpnServiceButtons = require('./buttons/vpn_service_buttons');
const { API } = require('../../utils/api');
const redisClient = require('../../config/redisClient');
const { InlineKeyboard } = require('grammy');
const serversServices = require('../servers/servers.service');

const label = 'VpnServices';

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
	await serversServices.getServerList({
		...ctx,
		update: {
			...ctx.update,
			callback_query: { data: `servers:${PAGINATION_LIMIT}:0` },
		},
	});
	// await getQRCode(ctx);
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
const getQRCode = async (ctx, code) => {
	logInfo('Getting QR code', label, ctx);

	const { id } = ctx.session.meta;
	const qrCode = await generateQRCode(id, code);

	ctx.answerCallbackQuery();
	await ctx.replyWithPhoto(qrCode, {
		caption: ctx.getLangText('vpn_services.qrCodeDescription'),
		reply_markup: new InlineKeyboard()
			.url(ctx.getLangText('vpn_services.os.android'), ANDROID_APP_URL)
			.url(ctx.getLangText('vpn_services.os.ios'), IOS_APP_URL),
	});
};

// /** Метод выбора операционной системы */
// const getOS = (ctx) => {
// 	logInfo('Providing operating systems', label, ctx);
// 	ctx.answerCallbackQuery();
// 	ctx.reply('vpn_services.os.title', {
// 		reply_markup: new InlineKeyboard()
// 			.text(ctx.getLangText('vpn_services.os.android'), 'android_app')
// 			.text(ctx.getLangText('vpn_services.os.ios'), 'ios_app'),
// 	});
// };

module.exports = {
	provideVpnServices,
	getTrialPeriod,
	getPaidVpnService,
	// getServers,
	getQRCode,
	// getOS,
};
