const { CustomError } = require("./CustomError");
const { StatusCodes } = require("http-status-codes");

class BadRequestError extends CustomError {
  BadRequestError(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
module.exports = { BadRequestError };
