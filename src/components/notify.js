module.exports = (ctx, text) => {
	console.log('ctx', ctx);
	console.log('text', text);
	if (ctx.update.callback_query) {
		ctx.answerCallbackQuery({
			text,
			show_alert: true,
		});
	} else {
		ctx.reply(text);
	}
};
