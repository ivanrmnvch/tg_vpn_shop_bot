const { Bot, InlineKeyboard } = require('grammy');
const process = require('node:process');
const path = require('node:path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { API } = require('./utils/api');

const { getLocaleText } = require('./utils/getLocaleText');

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new Bot(token);

bot.use(async (ctx, next) => {
	console.log('>>> CONTEXT', ctx);
	console.log('>>> UPDATE', ctx.update);
	const {
		id,
		first_name: firstName,
		username: userName,
		language_code: lang = 'en',
	} = ctx?.update?.message?.from || {};

	const check = await API.post('user/check', null, {
		params: { id },
	});

	console.log('>>> CHECK', check);
	ctx.getLangText = (path) => getLocaleText(lang, path);
	next();
});
bot.command('start', (ctx) => {
	const inlineKeyboard = new InlineKeyboard()
		.text(ctx.getLangText('start.btn.buyVpnKey'), 'buy_vpn_key')
		.row()
		.text(ctx.getLangText('start.btn.myAccount'), 'my_account')
		.row()
		.text(ctx.getLangText('start.btn.support'), 'support')
		.row()
		.text(ctx.getLangText('start.btn.aboutUs'), 'about_us');

	ctx.reply(ctx.getLangText('start.greeting'), {
		reply_markup: inlineKeyboard,
	});
});

// Обработка нажатий на инлайн-кнопки
bot.callbackQuery('buy_vpn_key', (ctx) => {
	const inlineKeyboard = new InlineKeyboard()
		.text(ctx.getLangText('buyVpnKey.btn.trial'), 'trial')
		.row()
		.text(ctx.getLangText('buyVpnKey.btn.month'), 'month')
		.row()
		.text(ctx.getLangText('buyVpnKey.btn.sixMonths'), 'six_months')
		.row()
		.text(ctx.getLangText('buyVpnKey.btn.year'), 'year');
	ctx.answerCallbackQuery(); // Закрыть всплывающее уведомление
	ctx.reply('Вы можете купить VPN ключ здесь.', {
		reply_markup: inlineKeyboard,
	});

	// vless://a0203bd6-5bd2-4bff-85ce-21ed854ccd89@5.61.56.107:443/?type=tcp&encryption=none&flow=xtls-rprx-vision&sni=www.microsoft.com&alpn=h2&fp=chrome&security=reality&pbk=BXISnyCWoWstABfOKkNH5sUdGSzPE0bpE6clUotbCBY&sid=bf4ce2edf5e4ab61&packetEncoding=xudp#netherlandas23test
});

bot.callbackQuery('my_account', (ctx) => {
	ctx.answerCallbackQuery(); // Закрыть всплывающее уведомление
	ctx.reply('Вот информация о вашем аккаунте.');
});

bot.callbackQuery('support', (ctx) => {
	ctx.answerCallbackQuery(); // Закрыть всплывающее уведомление
	ctx.reply(
		'Вы можете связаться с нашей техподдержкой по этому номеру: +123456789.'
	);
});

bot.callbackQuery('about_us', (ctx) => {
	ctx.answerCallbackQuery(); // Закрыть всплывающее уведомление
	ctx.reply('Мы предоставляем VPN сервисы...');
});

bot.start();
