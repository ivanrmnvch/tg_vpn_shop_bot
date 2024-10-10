const { API } = require('../../../utils/api');
const { logInfo, logError } = require('../../../utils/logger');

const checkUser = (id) => {
	console.log('this.name', this.name);
	try {
		logInfo('Check user exist', checkUser.name, { id });
		return API.post('user/check', null, {
			params: { id },
		});
	} catch (e) {
		logError('User checking error', checkUser.name, e);
		// todo если проверка не удалась, какой сценарий? заглушка?
	}
};

const addUser = (body) => {
	try {
		logInfo('Adding a new user', addUser.name, { body });
		return API.post('user', body);
	} catch (e) {
		logError('Error adding new user', addUser.name, e);
	}
};

const getUserMeta = (id) => {
	try {
		logInfo('Getting user meta', getUserMeta.name, { id });
		return API.get('user/meta', {
			params: { id },
		});
	} catch (e) {
		logError('Error getting user meta', getUserMeta.name, e);
	}
};

const getMeta = async (ctx) => {
	const {
		id,
		first_name: firstName,
		username: userName,
		language_code: lang,
	} = ctx?.update?.message?.from || {};

	const check = await checkUser(id);

	if (!check) {
		await addUser({
			id,
			firstName,
			userName,
			lang,
		});
	}

	return getUserMeta(id);
};

module.exports = { getMeta };
