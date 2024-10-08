const { API } = require('../../../utils/api');
const stream = require('stream');
const { InputFile } = require('grammy');

module.exports = {
	getQRCode: async (id, code) => {
		try {
			const QRCodeStream = await API.get('vpn-services', {
				params: { id, code },
				responseType: 'stream',
			});

			const passThroughStream = new stream.PassThrough();
			QRCodeStream.pipe(passThroughStream);
			return new InputFile(passThroughStream);
		} catch (e) {
			console.error(e);
			return null;
		}
	},
};
