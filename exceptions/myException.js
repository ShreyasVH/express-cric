class MyException extends Error {
  constructor(message = "") {
    super(message);
    this.name = "MyException";
    this.httpStatusCode = 501;
    this.description = message;
  }
}

module.exports = MyException;
