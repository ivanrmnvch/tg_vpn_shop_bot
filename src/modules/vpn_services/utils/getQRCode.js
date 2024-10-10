const { API } = require('../../../utils/api');
const stream = require('stream');
const { InputFile } = require('grammy');
const { logInfo, logError } = require('../../../utils/logger');

async function getQRCode(id, code) {
	try {
		logInfo('Getting QR code', getQRCode.name, { id, code });
		const QRCodeStream = await API.get('vpn-services', {
			params: { id, code },
			responseType: 'stream',
		});

		const passThroughStream = new stream.PassThrough();
		QRCodeStream.pipe(passThroughStream);
		return new InputFile(passThroughStream);
	} catch (e) {
		logError(e, getQRCode.name);
		return null;
	}
}

module.exports = { getQRCode };
