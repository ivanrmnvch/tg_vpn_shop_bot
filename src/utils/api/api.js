const axios = require('axios');
const HttpException = require('../HttpException');

const SERVICE_IS_OFFLINE = 'Ошибка подключения к сервису:';

/**
 * Класс Api для создания Axios экземпляра для доступа к микросервисам.
 */
class Api {
	constructor(baseURL) {
		this.instance = axios.create({
			baseURL,
			timeout: 60000,
			responseType: 'json',
		});
	}

	async get(url, config, fullAnswer = false) {
		try {
			const res = await this.instance.get(url, config);
			const data = res.data?.data !== undefined ? res.data?.data : res.data;
			const answer = {
				message: res.data.message || config.msg || '',
				data,
			};
			return fullAnswer ? res.data : answer;
		} catch (e) {
			if (!e.response) {
				const answer = { message: `${SERVICE_IS_OFFLINE} , ${e.message}` };
				throw new HttpException(answer, 502);
			}
			const answer = {
				message: e.response.data.message,
				data: e.response.data || (e.response.data && e.response.data.data),
			};
			throw new HttpException(answer, e.response.status);
		}
	}

	async post(url, data = {}, config, fullAnswer = false) {
		try {
			const res = await this.instance.post(url, data, config);
			const answer = {
				message: res.data.message || config.msg || '',
				data: res.data && res.data.data,
			};
			return fullAnswer ? res.data : answer;
		} catch (e) {
			if (!e.response) {
				const answer = { message: `${SERVICE_IS_OFFLINE} , ${e.message}` };
				throw new HttpException(answer, 502);
			}
			const answer = {
				message: e.response.data.message,
				data: e.response.data && e.response.data.data,
			};
			throw new HttpException(answer, e.response.status);
		}
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
