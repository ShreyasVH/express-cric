const BadRequestException = require('../../exceptions/badRequestException');

class CreateRequest {
  constructor(requestBody) {
    this.name = requestBody.name;
    this.city = requestBody.city;
    this.state = requestBody.state;
    this.countryId = requestBody.countryId;
  }

  validate () {
    if (!this.name) {
      throw new BadRequestException('Invalid name');
    }

    if (!this.city) {
      throw new BadRequestException('Invalid city');
    }
  }
}

module.exports = CreateRequest;
