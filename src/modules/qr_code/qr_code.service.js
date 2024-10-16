const { logInfo } = require('../../utils/logger');
const { generateQRCode } = require('../qr_code/helpers');
const {
	app: { ANDROID_APP_URL, IOS_APP_URL },
} = require('../../config/envConfig');
const { InlineKeyboard } = require('grammy');

const label = 'qrCode';

/** Метод получения QR кода */
const getQRCode = async (ctx, code) => {
	logInfo('Getting QR code', label, ctx);

	const { id } = ctx.session.meta;
	const qrCode = await generateQRCode(id, code);

	if (!qrCode) {
		ctx.answerCallbackQuery({
			show_alert: true,
			text: ctx.getLangText('vpn_services.qrCodeGenerateError'),
		});
		return;
	}

	ctx.deleteMessage();
	ctx.answerCallbackQuery();
	await ctx.replyWithPhoto(qrCode, {
		caption: ctx.getLangText('vpn_services.qrCodeDescription'),
		reply_markup: new InlineKeyboard()
			.url(ctx.getLangText('vpn_services.os.android'), ANDROID_APP_URL)
			.url(ctx.getLangText('vpn_services.os.ios'), IOS_APP_URL)
			.row()
			.text(ctx.getLangText('common.buttons.mainMenu'), 'back_to_main_menu')
			.text(
				ctx.getLangText('common.buttons.changeServer'),
				'back_to_server_menu'
			),
	});
};

module.exports = { getQRCode };