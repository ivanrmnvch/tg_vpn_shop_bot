const { getMeta } = require('./helpers');
const { getLocaleText } = require('../../utils/getLocaleText');
const { logInfo } = require('../../utils/logger');

const setUserMeta = async (ctx, next) => {
	const [msgType, value] = Object.entries(ctx.update).pop();
	const allowedMsgTypes = ['message', 'callback_query'];
	const isAllowedType = allowedMsgTypes.includes(msgType);

	const updateMeta =
		isAllowedType && (!ctx.session?.meta || ctx.session?.meta?.newUser);

	if (updateMeta) {
		logInfo('Setting user meta', setUserMeta.name, ctx);
		let meta = await getMeta(ctx);
		meta.id = value.from.id;
		ctx.session.meta = meta;
		logInfo('User meta successfully set', setUserMeta.name, meta);
	}

	const lang = value.from.language_code || 'en';

	ctx.getLangText = (path) => getLocaleText(lang, path);

	next();
};

module.exports = setUserMeta;
