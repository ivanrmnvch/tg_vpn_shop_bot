const { RedisAdapter } = require('@grammyjs/storage-redis');
const { Bot, session } = require('grammy');
const redisClient = require('./config/redisClient');

const { logError } = require('./utils/logger');

const meta = require('./modules/middlewares/meta');

const commands = require('./modules/commands');

const vpnServicesController = require('./modules/vpn_services/vpn_services.controller');
const transactionController = require('./modules/transaction/transaction.controller');
const serversController = require('./modules/servers/servers.controller');

const { TELEGRAM_BOT_TOKEN } = require('./config/envConfig').tg;

const bot = new Bot(TELEGRAM_BOT_TOKEN);

const redisAdapter = new RedisAdapter({ instance: redisClient });

// todo СЕЙЧАС!!!
//  1. Обработать покупку ключа, если он уже куплен
//   - можно кинуть заглушку, после добавить обновление тарифа
//  2. Передавать price через #{}
//  3. Добавить флажок страны в текстовку

// todo ПОСЛЕ РЕЛИЗА!!!
//  1. Добавить несколько ключей на аккаунт или возможность увеличивать количество подключений
//  или оставить как есть: один аккунт один ключ
//  2. Обновление тарифа до следующего уровня

bot.use(
	session({
		initial: () => ({}),
		storage: redisAdapter,
	})
);

bot.use(meta);

commands.start(bot);
commands.servers(bot);

vpnServicesController(bot);
transactionController(bot);
serversController(bot);

bot.catch((err) => {
	logError('Global error', 'App', err);
	err.ctx.reply('>>> GRAMMY ERROR');
});

bot.start();
