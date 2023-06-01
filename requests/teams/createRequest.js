const BadRequestException = require('../../exceptions/badRequestException');

class CreateRequest {
  constructor(requestBody) {
    this.name = requestBody.name;
    this.countryId = requestBody.countryId;
    this.typeId = requestBody.typeId;
  }

  validate () {
    if (!this.name) {
      throw new BadRequestException('Invalid name');
    }
  }
}

module.exports = CreateRequest;
