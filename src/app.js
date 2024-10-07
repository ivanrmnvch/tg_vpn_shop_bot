const { RedisAdapter } = require('@grammyjs/storage-redis');
const { Bot, session } = require('grammy');
const redisClient = require('./config/redisClient');

const meta = require('./modules/middlewares/meta');
const botEnv = require('./modules/middlewares/bot_env');

const commands = require('./modules/commands');

const vpnServicesModule = require('./modules/vpn_services/vpn_services.module');

const { TELEGRAM_BOT_TOKEN } = require('./config/envConfig').config;

const bot = new Bot(TELEGRAM_BOT_TOKEN);

const redisAdapter = new RedisAdapter({ instance: redisClient });

// todo 1. Реализовать сохранение чека <b>!important</b>
// todo 1.1 Добавить в таблицу новые поля
// todo 1.2 фикс методов
// todo 2. Реализовать "10 дней бесплатной подписки"

bot.use(
	session({
		initial: () => ({}),
		storage: redisAdapter,
	})
);

bot.use(meta);
bot.use(botEnv);

commands.start(bot);

vpnServicesModule(bot);

bot.catch((err) => {
	console.log('>>> err::', err);
	// err.ctx.reply('Бот временно недоступен, перезвоните позже');
});

bot.start();
