const { getMeta } = require('../../stages');
const { getLocaleText } = require('../../utils/getLocaleText');

module.exports = async (ctx, next) => {
	console.log('ctx', ctx);

	const getMsgType = (ctx) => Object.keys(ctx.update).pop();
	const allowedMsgTypes = ['message', 'callback_query'];
	const msgType = getMsgType(ctx);

	const isAllowedType = allowedMsgTypes.includes(msgType);

	if (isAllowedType && !ctx.session.meta) {
		ctx.session.meta = await getMeta(ctx);
	}

	const lang = ctx?.update?.[msgType]?.from?.language_code || 'en';

	console.log('lang', lang);

	ctx.getLangText = (path) => getLocaleText(lang, path);

	next();
};
