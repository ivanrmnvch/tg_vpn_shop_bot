const path = require('node:path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

module.exports = {
	tg: {
		TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
		PROVIDER_TOKEN_TEST: process.env.PROVIDER_TOKEN_TEST,
	},
	redis: {
		REDIS_USER: process.env.REDIS_USER,
		REDIS_USER_PASSWORD: process.env.REDIS_USER_PASSWORD,
		REDIS_HOST: process.env.REDIS_HOST,
		REDIS_PORT: process.env.REDIS_PORT,
	},
	app: {
		BACKEND_BASE_URL: process.env.BACKEND_BASE_URL,

		ANDROID_APP_URL: process.env.ANDROID_APP_URL,
		IOS_APP_URL: process.env.IOS_APP_URL,

		PAGINATION_LIMIT: process.env.PAGINATION_LIMIT,

		prices: {
			month: process.env.PRICE_MONTH,
			six_months: process.env.PRICE_SIX_MONTHS,
			year: process.env.PRICE_YEAR,
		},

		numberOfMonths: {
			month: process.env.ONE_MONTH,
			six_months: process.env.SIX_MONTHS,
			year: process.env.TWELVE_MONTHS,
		},

		services: {
			trial: process.env.TRIAL_CODE,
			month: process.env.MONTH_CODE,
			six_months: process.env.SIX_MONTHS_CODE,
			year: process.env.YEAR_CODE,
		},
	},
};
