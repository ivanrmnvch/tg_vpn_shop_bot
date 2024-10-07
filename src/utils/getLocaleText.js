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
	// console.log('string', string);
	// console.log('params', params);

	let newString = string;
	Object.keys(params).forEach((param) => {
		newString = newString.replace(`#{${param}}`, params[param].toString());
	});
	return newString;
};

const getLocaleText = (lang, path, text = null) => {
	// console.log('locale', locale[lang]);
	const langString = path
		.split('.')
		.reduce((acc, field) => (acc[field] ? acc[field] : acc), locale[lang]);
	// console.log('text', text);
	// console.log('langString', langString);
	return text ? paramParser(langString, text) : langString;
};

module.exports = {
	getLocaleText,
};
