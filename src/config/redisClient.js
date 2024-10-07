const Redis = require('ioredis');
const { REDIS_USER, REDIS_USER_PASSWORD, REDIS_HOST, REDIS_PORT } =
	require('./envConfig').config;

const redisClient = new Redis({
	username: REDIS_USER,
	password: REDIS_USER_PASSWORD,
	host: REDIS_HOST,
	port: REDIS_PORT,
});

module.exports = redisClient;
