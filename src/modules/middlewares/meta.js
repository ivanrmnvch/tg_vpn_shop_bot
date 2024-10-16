const { getMeta } = require('./helpers');
const { getLocaleText } = require('../../utils/getLocaleText');
const { logInfo } = require('../../utils/logger');

const label = 'Middlewares/Meta';

const setUserMeta = async (ctx, next) => {
	const [msgType, value] = Object.entries(ctx.update).pop();
	const allowedMsgTypes = ['message', 'callback_query'];
	const isAllowedType = allowedMsgTypes.includes(msgType);

	const updateMeta =
		isAllowedType && // если допустимый тип И
		(!ctx.session.meta || // если нет meta
			ctx.session.meta?.newUser || // ИЛИ новый пользователь
			!ctx.session.meta?.activeTrial || // ИЛИ нет активного триала
			(ctx.session.meta?.expireTrial &&
				new Date(ctx.session.meta.expireTrial) < new Date()) || // ИЛИ у триала закончился срок
			!ctx.session.meta?.activeTariff || // ИЛИ нет активного тарифа
			(ctx.session.meta?.expireTariff &&
				new Date(ctx.session.meta.expireTariff) < new Date())); // ИЛИ у текущего тарифа закончился срок

	if (updateMeta) {
		logInfo('Setting user meta', label, ctx);
		let meta = await getMeta(ctx);
		meta.id = value.from.id;
		ctx.session.meta = meta;
		logInfo('User meta successfully set', label, meta);
	}

	const lang = value.from.language_code || 'en';

	ctx.getLangText = (path, params) => getLocaleText(lang, path, params);

	next();
};

module.exports = setUserMeta;
