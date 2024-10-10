const locale = require('../locale');

/**
 * Добавление переменных к строке
 * Параметры описываются в виде #{<ключ параметра>}
 *
 * @param {string} string
 * @param {Object} params
 * @return {string}
 */
const paramParser = (string, params) => {
	let newString = string;
	Object.keys(params).forEach((param) => {
		newString = newString.replace(`#{${param}}`, params[param].toString());
	});
	return newString;
};

const getLocaleText = (lang, path, text = null) => {
	const langString = path
		.split('.')
		.reduce((acc, field) => (acc[field] ? acc[field] : acc), locale[lang]);
	return text ? paramParser(langString, text) : langString;
};

module.exports = {
	getLocaleText,
};
