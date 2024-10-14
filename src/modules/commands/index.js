const start = require('./start');
const tariffs = require('./tariffs');
const servers = require('./servers');

module.exports = (bot) => {
	bot.command('start', start);
	bot.command('tariffs', tariffs);
	bot.command('servers', servers);
};
