const { logInfo, logError } = require('../../utils/logger');
const { API } = require('../../utils/api');
const { InlineKeyboard } = require('grammy');
const vpnServicesService = require('../vpn_services/vpn_services.service');

const label = 'Servers';

const getServerList = async (ctx, limit = 5, offset = 0) => {
	console.log('>>> getServerList ctx', ctx);
	let servers;

	try {
		logInfo('Getting servers', label, ctx);
		servers = await API.get('servers', { params: { limit, offset } });
		console.log('servers', servers);
	} catch (e) {
		logError('Getting servers error', label, e);
		ctx.answerCallbackQuery();
		ctx.reply(ctx.getLangText('servers.error.serverList'));
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

	console.log('buttons', buttons.inline_keyboard);

	// todo как понять когда отправлять клавиатуру, а когда обновлять
	if (ctx.update.callback_query) {
		await ctx.editMessageReplyMarkup({
			reply_markup: buttons,
		});
		await ctx.answerCallbackQuery();
	} else {
		ctx.reply(ctx.getLangText('servers.title'), {
			reply_markup: buttons,
		});
	}
};

const getServer = async (ctx) => {
	console.log('get server');
	const { data } = ctx.update.callback_query;
	const name = data.split(':').pop();
	await vpnServicesService.getQRCode(ctx, name);
};

const getServerListWrap = async (ctx) => {
	console.log('>>> servers');
	const { data } = ctx.update.callback_query;
	const [, limit, offset] = data.split(':').map(Number);
	return getServerList(ctx, limit, offset);
};

module.exports = {
	getServerList,
	getServer,
	getServerListWrap,
};
