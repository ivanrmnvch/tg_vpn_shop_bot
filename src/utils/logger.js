const { createLogger, format, transports } = require('winston');
let chalk;

(async () => {
	chalk = await import('chalk').then((data) => data.default);
})();

// Функция для удаления ANSI escape кодов
const stripAnsi = (string) => string.replace(/\x1B\[[0-9;]*m/g, '');

const logger = createLogger({
	level: 'info',
	format: format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss.SSS',
		}),
		format.printf((params) => {
			const style =
				params.level === 'error'
					? {
							info: chalk.bold.redBright,
							text: chalk.red,
						}
					: {
							info: chalk.bold.greenBright,
							text: chalk.green,
						};

			const timestamp = chalk.blue(`[${params.timestamp}]`);
			const level = style.info(`[${params.level.toUpperCase()}]`);
			const label = params.label ? style.info(` [${params.label}]`) : '';
			const stack = params.stack
				? `${chalk.bold.redBright('\n[Stack]')}: ${params.stack}\n`
				: '';
			const meta = params.meta
				? `${chalk.bold.magentaBright('[Meta]')}: ${chalk.magenta(JSON.stringify(params.meta))}`
				: '';
			const message = `${style.text(params.message)}${meta ? ' ' : ''}`;

			const log = `${timestamp} ${level}${label}: ${message}${stack}${meta}`;

			return {
				original: log,
				clean: stripAnsi(log),
			};
		})
	),
	transports: [
		new transports.Console({
			format: format.printf((params) => params[Symbol.for('message')].original),
		}),
		new transports.File({
			filename: 'error.log',
			level: 'error',
			format: format.printf((params) => params[Symbol.for('message')].clean),
		}),
		new transports.File({
			filename: 'combined.log',
			format: format.printf((params) => params[Symbol.for('message')].clean),
		}),
	],
});

module.exports = {
	logInfo: (message, label, data) => {
		const ctx = data?.update ? Object.values(data.update).pop() : null;
		logger.info(message, {
			label,
			meta: {
				...(ctx
					? {
							from: ctx.from,
							data: ctx?.data,
							text: ctx?.text,
							successful_payment: ctx?.successful_payment,
						}
					: {}),
				...(ctx ? {} : data),
			},
		});
	},
	logError: (message, label, error) => {
		const { stack, name, ctx } = error;
		logger.error(message, {
			stack,
			meta: {
				type: name,
				ctx: ctx?.update,
			},
			label,
		});
	},
};
