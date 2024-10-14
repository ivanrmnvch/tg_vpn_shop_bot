const start = require('../commands/start');
const tarrifs = require('../commands/tariffs');

module.exports = (bot) => {
	/** Метод возврата к главному меню */
	bot.callbackQuery('back_to_main_menu', start);

	/** Метод возврата к меню тарифов */
	bot.callbackQuery('back_to_tariffs', tarrifs);
};
