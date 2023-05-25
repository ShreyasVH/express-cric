const MyException = require('./myException');

class ConflictException extends MyException {
  constructor(entity = "") {
    const message = entity + ' already exists';
    super(message);
    this.name = "ConflictException";
    this.httpStatusCode = 409;
    this.description = message;
  }
}

module.exports = ConflictException;
