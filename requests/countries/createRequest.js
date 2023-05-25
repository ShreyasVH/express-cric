const BadRequestException = require('../../exceptions/badRequestException');

class CreateRequest {
  constructor(requestBody) {
    this.name = requestBody.name;
  }

  validate () {
    if (!this.name) {
      throw new BadRequestException('Invalid name');
    }
  }
}

module.exports = CreateRequest;
