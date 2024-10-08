const transactionEvents = require('./transaction.events');

module.exports = (bot) => {
	transactionEvents(bot);
};
