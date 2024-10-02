const axios = require('axios');

class Api {
	constructor(baseURL) {
		this.instance = axios.create({
			baseURL,
			timeout: 60000,
			responseType: 'json',
		});
	}

	async get(url, config) {
		const { data } = await this.instance.get(url, config);
		return data;
	}

	async post(url, body = {}, config) {
		const { data } = await this.instance.post(url, body, config);
		return data;
	}

	// async delete(url, config) {
	// 	try {
	// 		const res = await this.instance.delete(url, config);
	// 		return {
	// 			message: res.data.message || config.msg || '',
	// 			data: res.data && res.data.data,
	// 		};
	// 	} catch (e) {
	// 		if (!e.response) {
	// 			const answer = { message: `${SERVICE_IS_OFFLINE} , ${e.message}` };
	// 			throw new HttpException(answer, 502);
	// 		}
	// 		const answer = {
	// 			message: e.response.data.message,
	// 			data: e.response.data && e.response.data.data,
	// 		};
	// 		throw new HttpException(answer, e.response.status);
	// 	}
	// }

	// async put(url, data = {}, config) {
	// 	try {
	// 		const res = await this.instance.put(url, data, config);
	// 		return {
	// 			message: res.data.message || config.msg || '',
	// 			data: res.data && res.data.data,
	// 		};
	// 	} catch (e) {
	// 		if (!e.response) {
	// 			const answer = { message: `${SERVICE_IS_OFFLINE} , ${e.message}` };
	// 			throw new HttpException(answer, 502);
	// 		}
	// 		const answer = {
	// 			message: e.response.data.message,
	// 			data: e.response.data && e.response.data.data,
	// 		};
	// 		throw new HttpException(answer, e.response.status);
	// 	}
	// }
}

module.exports = Api;
