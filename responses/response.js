class Response {
  constructor(success, data, message) {
    this.success = success;
    this.data = data;
    this.message = message;
  }

  static success(data) {
    return new Response(true, data, "");
  }

  static successWithMessage(message) {
    return new Response(true, null, message);
  }

  static error(message) {
    return new Response(false, null, message);
  }
}

module.exports = Response;
