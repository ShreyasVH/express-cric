const MyException = require('./myException');

class BadRequestException extends MyException {
  constructor(description = "") {
    super(description);
    this.name = "BadRequestException";
    this.httpStatusCode = 400;
    this.description = description;
  }
}

module.exports = BadRequestException;
