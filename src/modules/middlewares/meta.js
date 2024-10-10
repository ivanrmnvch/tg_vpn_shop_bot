const { getMeta } = require('./helpers');
const { getLocaleText } = require('../../utils/getLocaleText');
const { logInfo } = require('../../utils/logger');

const setUserMeta = async (ctx, next) => {
	const getMsgType = (ctx) => Object.keys(ctx.update).pop();
	const allowedMsgTypes = ['message', 'callback_query'];
	const msgType = getMsgType(ctx);

	const isAllowedType = allowedMsgTypes.includes(msgType);

	const updateMeta = isAllowedType && ctx.session.meta?.newUser;

	if (updateMeta) {
		logInfo('Setting user meta', setUserMeta.name, ctx);
		const meta = await getMeta(ctx);
		ctx.session.meta = meta;
		logInfo('User meta successfully set', setUserMeta.name, meta);
	}

	const lang = ctx?.update?.[msgType]?.from?.language_code || 'en';

	ctx.getLangText = (path) => getLocaleText(lang, path);

	next();
};

module.exports = setUserMeta;
