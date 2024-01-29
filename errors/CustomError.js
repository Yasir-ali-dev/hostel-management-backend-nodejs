class CustomError extends Error {
  CustomError(message) {
    this.super(message);
  }
}
module.exports = { CustomError };
