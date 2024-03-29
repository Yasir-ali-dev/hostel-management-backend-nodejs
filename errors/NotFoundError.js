const { StatusCodes } = require("http-status-codes");
const { CustomError } = require("./CustomError");

class NotFoundError extends CustomError {
  NotFoundError(message) {
    this.super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
module.exports = { NotFoundError };
