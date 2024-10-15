const { logInfo, logError } = require('../../utils/logger');
const {
	app: { prices },
	tg: { PROVIDER_TOKEN_TEST },
} = require('../../config/envConfig');
const vpnServiceButtons = require('./buttons/vpn_service_buttons');
const { API } = require('../../utils/api');
const redisClient = require('../../config/redisClient');
const { InlineKeyboard } = require('grammy');
const serversServices = require('../servers/servers.service');
const { formatDate } = require('../../utils/date');

const label = 'VpnServices';

/** Метод выбора VPN услуг */
const provideVpnServices = (ctx) => {
	logInfo('Providing vpn services', label, ctx);

	const buttons = vpnServiceButtons(ctx);

	if (
		ctx.update.callback_query &&
		ctx.update.callback_query.data === 'back_to_tariffs'
	) {
		ctx.deleteMessage();
		ctx.reply(ctx.getLangText('vpn_services.title'), {
			reply_markup: buttons,
		});
		return;
	}

	if (ctx.update.callback_query) {
		ctx.answerCallbackQuery();
		ctx.editMessageText(ctx.getLangText('vpn_services.title'), {
			reply_markup: buttons,
		});
		return;
	}

	ctx.reply(ctx.getLangText('vpn_services.title'), {
		reply_markup: buttons,
	});
};

/** Метод оформления пробного периода */
const getTrialPeriod = async (ctx) => {
	logInfo('Getting trial period', label, ctx);

	if (!ctx.session.meta.newUser) {
		ctx.answerCallbackQuery({
			text: ctx.getLangText('vpn_services.trialIsBlock'),
			show_alert: true,
		});
		return;
	}

	const { id } = ctx.session.meta;

	try {
		logInfo('User trial update', label, { id });
		await API.post(`user/${id}/trial`);
	} catch (e) {
		logError('User trial update error', label, e);
		ctx.answerCallbackQuery({
			text: ctx.getLangText('vpn_services.trialUpdateError'),
			show_alert: true,
		});
		return;
	}

	try {
		logInfo('Update user session', label, { id });
		ctx.session.meta.newUser = false;
		redisClient.set(id, JSON.stringify(ctx.session));
	} catch (e) {
		logError('Error updating user session', label, e);
	}

	ctx.answerCallbackQuery(ctx.getLangText('vpn_services.trialSuccess'));
	await serversServices.getServerList(ctx);
};

/** Метод оформления платных VPN подписок */
const getPaidVpnService = async (ctx) => {
	logInfo('Getting paid VPN service', label, ctx);

	const service = ctx.update.callback_query.data;

	if (ctx.session.meta.activeTariff) {
		ctx.answerCallbackQuery({
			text: ctx.getLangText('vpn_services.warn.activeTariff', {
				tariff: ctx.getLangText(`common.tariffs.${ctx.session.meta.tariff}`),
				endDate: formatDate(ctx.session.meta.expireTariff),
			}),
			show_alert: true,
		});
	}

	await ctx.deleteMessage();
	const sentInvoice = await ctx.replyWithInvoice(
		ctx.getLangText(`common.tariffs.${service}`),
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
			reply_markup: new InlineKeyboard()
				.pay(
					ctx.getLangText('vpn_services.buttons.pay', {
						price: prices[service] / 100,
					})
				)
				.text(ctx.getLangText('common.buttons.cancel'), 'back_to_tariffs'),
		}
	);

	try {
		const { id } = ctx.session.meta;
		ctx.session.invoice = {
			msgId: sentInvoice.message_id,
			chatId: sentInvoice.chat.id,
		};
		redisClient.set(id, JSON.stringify(ctx.session));
	} catch (e) {
		// todo
		console.error('e', e);
	}
};

module.exports = {
	provideVpnServices,
	getTrialPeriod,
	getPaidVpnService,
};
