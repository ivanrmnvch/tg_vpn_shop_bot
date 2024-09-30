const TelegramBot = require('node-telegram-bot-api');
const process = require('node:process');
const path = require('node:path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const token = process.env.TELEGRAM_BOT_TOKEN;

// todo логирование
// todo redis для сессий
// todo postgres для долгих данных
// todo разделение на компоненты, модульная структура, маршрутизация
// todo pulling на локалке на проде webhook
// todo резервное копирование, дамп БД
// todo балансировка нагрузи
// todo healthcheck

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Обработчик на любое текстовое сообщение
bot.on('message', (msg) => {
	console.log('msg', msg);
	const chatId = msg.chat.id;
	const text = msg.text;

	console.log(
		`Получено сообщение: ${text} от пользователя ${msg.from.username}`
	);

	// Ответ на полученное сообщение
	bot.sendMessage(chatId, 'Привет! Я получил ваше сообщение.');
});
