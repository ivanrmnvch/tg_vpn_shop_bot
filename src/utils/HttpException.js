class HttpException extends Error {
	constructor(message, errorCode) {
		super(message);
		this.name = this.constructor.name;
		this.errorCode = errorCode;
		Error.captureStackTrace(this, this.constructor); // Захватываем стек ошибки
	}
}

module.exports = HttpException;
