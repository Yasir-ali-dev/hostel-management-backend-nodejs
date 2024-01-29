const { CustomError } = require("./CustomError");
const { StatusCodes } = require("http-status-codes");

class BadRequestError extends CustomError {
  BadRequestError(message) {
    this.super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
module.exports = { BadRequestError };
