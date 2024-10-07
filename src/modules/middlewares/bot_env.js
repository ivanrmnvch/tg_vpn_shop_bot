const { config } = require('../../config/envConfig');

module.exports = (ctx, next) => {
	ctx.config = config;
	next();
};
