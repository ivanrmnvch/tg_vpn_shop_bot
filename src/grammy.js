const { RedisAdapter } = require('@grammyjs/storage-redis');
const { Bot, session, InlineKeyboard } = require('grammy');
const process = require('node:process');
const path = require('node:path');
const redisClient = require('./config/redisClient');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const { getMeta } = require('./stages');
const { getLocaleText } = require('./utils/getLocaleText');

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new Bot(token);

const redisAdapter = new RedisAdapter({ instance: redisClient });

bot.use(
	session({
		initial: () => ({}),
		storage: redisAdapter,
	})
);
bot.use(async (ctx, next) => {
	if (!ctx.session.meta) {
		ctx.session.meta = await getMeta(ctx);
	}

	const lang = ctx?.update?.message?.from?.language_code || 'en';
	ctx.getLangText = (path) => getLocaleText(lang, path);

	next();
});
bot.command('start', (ctx) => {
	console.log('>>> START CONTEXT', ctx.session);

	// todo функция для построения кнопок, передавать конфиги
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

bot.catch((err) => {
	console.log('>>> err::', err);
	err.ctx.reply('Бот временно недоступен, перезвоните позже');
});

bot.start();
