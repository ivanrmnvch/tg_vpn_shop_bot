const locale = require('../locale');

const getLocaleText = (lang, path) => {
	return path
		.split('.')
		.reduce((acc, field) => (acc[field] ? acc[field] : acc), locale[lang]);
};

module.exports = {
	getLocaleText,
};
