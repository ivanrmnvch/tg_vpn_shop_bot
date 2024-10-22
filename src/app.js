const { RedisAdapter } = require('@grammyjs/storage-redis');
const { Bot, session } = require('grammy');
const redisClient = require('./config/redisClient');

const { logError } = require('./utils/logger');

const initialSession = require('./entities/initialSession');

const start = require('./modules/commands/start');
const meta = require('./modules/middlewares/meta');

const vpnServicesController = require('./modules/vpn_services/vpn_services.controller');
const transactionController = require('./modules/transaction/transaction.controller');
const serversController = require('./modules/servers/servers.controller');
const routerController = require('./modules/router/router.controller');
const subscriptionController = require('./modules/subscription/subscription.controller');

const { TELEGRAM_BOT_TOKEN } = require('./config/envConfig').tg;

const bot = new Bot(TELEGRAM_BOT_TOKEN);

const redisAdapter = new RedisAdapter({ instance: redisClient });

bot.use(
	session({
		initial: () => initialSession,
		storage: redisAdapter,
	})
);

bot.use(meta);
bot.command('start', start);

vpnServicesController(bot);
transactionController(bot);
serversController(bot);
routerController(bot);
subscriptionController(bot);

bot.catch((err) => {
	logError('Global error', 'App', err);
	err.ctx.reply(err.ctx.getLangText('errors.global'));
});

bot.start();
