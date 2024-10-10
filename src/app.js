const { RedisAdapter } = require('@grammyjs/storage-redis');
const { Bot, session } = require('grammy');
const redisClient = require('./config/redisClient');

const { logError } = require('./utils/logger');

const meta = require('./modules/middlewares/meta');

const commands = require('./modules/commands');

const vpnServicesController = require('./modules/vpn_services/vpn_services.controller');
const transactionController = require('./modules/transaction/transaction.controller');

const { TELEGRAM_BOT_TOKEN } = require('./config/envConfig').config;

const bot = new Bot(TELEGRAM_BOT_TOKEN);

const redisAdapter = new RedisAdapter({ instance: redisClient });

// todo 1. Реализовать сохранение чека <b>!important</b>
// todo 1.1 Добавить в таблицу новые поля
// todo 1.2 фикс методов
// todo 2. Реализовать "10 дней бесплатной подписки"

// todo вынести lang в отдельный middleware

bot.use(
	session({
		initial: () => ({}),
		storage: redisAdapter,
	})
);

bot.use(meta);

commands.start(bot);

vpnServicesController(bot);
transactionController(bot);

bot.catch((err) => {
	logError('Global error', 'App', err);
	err.ctx.reply('>>> GRAMMY ERROR');
});

bot.start();
