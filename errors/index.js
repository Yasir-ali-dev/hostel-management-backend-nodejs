const { UnAuthorizedError } = require("./UnAuthorizedError");
const { NotFoundError } = require("./NotFoundError");
const { BadRequestError } = require("./BadRequestError");
const { CustomError } = require("./CustomError");

module.exports = {
  UnAuthorizedError,
  BadRequestError,
  NotFoundError,
  CustomError,
};
