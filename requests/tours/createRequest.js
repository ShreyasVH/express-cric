const BadRequestException = require('../../exceptions/badRequestException');

class CreateRequest {
  constructor(requestBody) {
    this.name = requestBody.name;
    this.startTime = requestBody.startTime;
  }

  validate () {
    if (!this.name) {
      throw new BadRequestException('Invalid name');
    }

    if (!this.startTime) {
      throw new BadRequestException('Invalid start time');
    }
  }
}

module.exports = CreateRequest;
