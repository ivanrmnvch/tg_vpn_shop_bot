module.exports = (ctx, text) => {
	if (ctx.update.callback_query) {
		ctx.answerCallbackQuery({
			text,
			show_alert: true,
		});
	} else {
		ctx.reply(text);
	}
};
