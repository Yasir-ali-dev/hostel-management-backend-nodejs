const { StatusCodes } = require("http-status-codes");
const { CustomError } = require("./CustomError");

class UnAuthorizedError extends CustomError {
  UnAuthorizedError(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
module.exports = { UnAuthorizedError };
