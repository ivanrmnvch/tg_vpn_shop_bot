const path = require('node:path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const Api = require('./api');

const API = new Api(process.env.BACKEND_BASE_URL);

module.exports = { API };
