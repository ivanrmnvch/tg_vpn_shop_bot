const Redis = require('ioredis');
const process = require('node:process');
const path = require('node:path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

console.log('process.env.REDIS_USER', process.env.REDIS_USER);

const redisClient = new Redis({
	username: process.env.REDIS_USER,
	password: process.env.REDIS_USER_PASSWORD,
	host: process.env.REDIS_HOST,
	port: process.env.REDIS_PORT,
});

module.exports = redisClient;
