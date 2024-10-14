const { logInfo, logError } = require('../../utils/logger');
const { API } = require('../../utils/api');
const { InlineKeyboard } = require('grammy');
const vpnServicesService = require('../vpn_services/vpn_services.service');
const notify = require('../../components/notify');

const label = 'Servers';

const getServerList = async (ctx, limit = 5, offset = 0) => {
	let servers;

	try {
		logInfo('Getting servers', label, ctx);
		servers = await API.get('servers', { params: { limit, offset } });
	} catch (e) {
		logError('Getting servers error', label, e);
		notify(ctx, ctx.getLangText('servers.error.serverList'));
		return;
	}

	const buttons = servers.data.reduce(
		(instance, server) =>
			instance
				.text(
					ctx.getLangText(`common.countries.${server.country_code}`),
					`server:${server.name}`
				)
				.row(),
		new InlineKeyboard()
	);

	if (offset > 0) {
		buttons.text(
			ctx.getLangText('common.buttons.back'),
			`servers:${limit}:${Math.max(0, offset - limit)}`
		);
	}

	if (offset + limit < servers.total) {
		buttons.text(
			ctx.getLangText('common.buttons.next'),
			`servers:${limit}:${offset + limit}`
		);
	}

	buttons
		.row()
		.text(ctx.getLangText('common.buttons.mainMenu'), 'back_to_main_menu');

	if (ctx.update.callback_query) {
		ctx.editMessageReplyMarkup({
			reply_markup: buttons,
		});
		ctx.answerCallbackQuery();
	} else {
		ctx.reply(ctx.getLangText('servers.title'), {
			reply_markup: buttons,
		});
	}
};

const getServer = async (ctx) => {
	const { data } = ctx.update.callback_query;
	const name = data.split(':').pop();
	await vpnServicesService.getQRCode(ctx, name);
};

const getServerListWrap = async (ctx) => {
	const { data } = ctx.update.callback_query;
	const [, limit, offset] = data.split(':').map(Number);
	return getServerList(ctx, limit, offset);
};

module.exports = {
	getServerList,
	getServer,
	getServerListWrap,
};
