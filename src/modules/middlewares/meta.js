const { getMeta } = require('../../stages');
const { getLocaleText } = require('../../utils/getLocaleText');

module.exports = async (ctx, next) => {
	console.log('>>> START CTX', ctx);
	const getMsgType = (ctx) => Object.keys(ctx.update).pop();
	const allowedMsgTypes = ['message', 'callback_query'];
	const msgType = getMsgType(ctx);

	const isAllowedType = allowedMsgTypes.includes(msgType);

	if (isAllowedType && !ctx.session.meta) {
		console.log('>>> START SESSION', ctx.session);
		ctx.session.meta = await getMeta(ctx);
		ctx.session.meta.newUser = true;
		console.log('>>> META', ctx.session.meta);
	}

	// todo вынести lang в отдельный middleware

	const lang = ctx?.update?.[msgType]?.from?.language_code || 'en';

	// console.log('lang', lang);

	ctx.getLangText = (path) => getLocaleText(lang, path);

	console.log('>>> CTX', ctx);

	next();
};
