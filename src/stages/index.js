const { API } = require('../utils/api');

const checkUser = (id) =>
	API.post('user/check', null, {
		params: { id },
	});

const addUser = (body) => API.post('user', body);

const getUserMeta = (id) =>
	API.get('user/meta', {
		params: { id },
	});

const getMeta = async (ctx) => {
	const {
		id,
		first_name: firstName,
		username: userName,
		language_code: lang,
	} = ctx?.update?.message?.from || {};

	const check = await checkUser(id, ctx);

	if (!check) {
		await addUser(
			{
				id,
				firstName,
				userName,
				lang,
			},
			ctx
		);
	}

	return getUserMeta(id, ctx);
};

module.exports = { getMeta };
