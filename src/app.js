const { RedisAdapter } = require('@grammyjs/storage-redis');
const { Bot, session, InlineKeyboard } = require('grammy');
const process = require('node:process');
const path = require('node:path');
const redisClient = require('./config/redisClient');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// const { getMeta } = require('./stages');
// const { getLocaleText } = require('./utils/getLocaleText');

const middlewares = require('./modules/middlewares');
const commands = require('./modules/commands');
const vpnServicesModule = require('./modules/vpn_services/vpn_services.module');

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new Bot(token);

const redisAdapter = new RedisAdapter({ instance: redisClient });

bot.use(
	session({
		initial: () => ({}),
		storage: redisAdapter,
	})
);

bot.use(middlewares);

commands.start(bot);

vpnServicesModule(bot);

bot.catch((err) => {
	console.log('>>> err::', err);
	// err.ctx.reply('Бот временно недоступен, перезвоните позже');
});

bot.start();

module.exports = bot;

// Обработка нажатий на инлайн-кнопки
// bot.callbackQuery('buy_vpn_key', (ctx) => {
// 	const inlineKeyboard = new InlineKeyboard()
// 		.text(ctx.getLangText('buyVpnKey.btn.trial'), 'trial')
// 		.row()
// 		.text(ctx.getLangText('buyVpnKey.btn.month'), 'month')
// 		.row()
// 		.text(ctx.getLangText('buyVpnKey.btn.sixMonths'), 'six_months')
// 		.row()
// 		.text(ctx.getLangText('buyVpnKey.btn.year'), 'year');
// 	ctx.answerCallbackQuery(); // Закрыть всплывающее уведомление
// 	ctx.reply('Выберите тариф', {
// 		reply_markup: inlineKeyboard,
// 	});
//
// 	// vless://a0203bd6-5bd2-4bff-85ce-21ed854ccd89@5.61.56.107:443/?type=tcp&encryption=none&flow=xtls-rprx-vision&sni=www.microsoft.com&alpn=h2&fp=chrome&security=reality&pbk=BXISnyCWoWstABfOKkNH5sUdGSzPE0bpE6clUotbCBY&sid=bf4ce2edf5e4ab61&packetEncoding=xudp#netherlandas23test
// });

bot.callbackQuery('trial', async (ctx) => {
	// await ctx.replyWithInvoice(
	// 	'Название товара',
	// 	'Описание товара',
	// 	'381764678:TEST:97121',
	// 	'RUB',
	// 	[{ label: 'Продукт 1', amount: 5000 }],
	// 	'fdsa'
	// );

	const test = await ctx.replyWithInvoice(
		'Название товара', // Название товара
		'Описание товара', // Описание товара
		'test', // Уникальный идентификатор транзакции
		'RUB', // Валюта
		[{ label: 'Продукт 1', amount: 15000 }], // Цена
		{
			provider_token: '381764678:TEST:97121',
			// prices: [{ label: 'Продукт 1', amount: 999 }],
		} // Тестовый токен ЮKassa
	);

	console.log('test', test);
});

bot.on('pre_checkout_query', async (ctx) => {
	console.log('>>>>>>>> PRE CHECKOUT QUERY');
	const preCheckoutQuery = ctx.preCheckoutQuery; // Получаем объект PreCheckoutQuery

	console.log('preCheckoutQuery', preCheckoutQuery);

	// Здесь вы можете проверить, правильный ли запрос и подходит ли он вам
	// Например, можно проверить payload или другие параметры
	const isPaymentValid = true; // Замените это на вашу проверку

	if (isPaymentValid) {
		// Если всё хорошо, ответьте на PreCheckoutQuery
		await ctx.answerPreCheckoutQuery(true); // true означает успешное подтверждение
	} else {
		// Если что-то не так, можете отправить false
		await ctx.answerPreCheckoutQuery(false, {
			error_message:
				'Ошибка при обработке платежа. Пожалуйста, попробуйте ещё раз.',
		});
	}
});

bot.on('message:successful_payment', async (ctx) => {
	console.log('successful payment ctx', ctx);
	console.log('update', ctx.update);
	console.log('payment', ctx.update.message.successful_payment);
});

// bot.catch((err) => {
// 	console.log('>>> err::', err);
// 	// err.ctx.reply('Бот временно недоступен, перезвоните позже');
// });
//
// bot.start();
