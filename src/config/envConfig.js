const path = require('node:path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

module.exports = {
	config: {
		TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
		PROVIDER_TOKEN_TEST: process.env.PROVIDER_TOKEN_TEST,

		REDIS_USER: process.env.REDIS_USER,
		REDIS_USER_PASSWORD: process.env.REDIS_USER_PASSWORD,
		REDIS_HOST: process.env.REDIS_HOST,
		REDIS_PORT: process.env.REDIS_PORT,

		BACKEND_BASE_URL: process.env.BACKEND_BASE_URL,
	},
};
