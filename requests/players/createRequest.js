const BadRequestException = require('../../exceptions/badRequestException');

class CreateRequest {
    constructor(requestBody) {
        this.name = requestBody.name;
        this.countryId = requestBody.countryId;
        this.dateOfBirth = requestBody.dateOfBirth;
        this.image = requestBody.image;
    }

    validate () {
        if (!this.name) {
            throw new BadRequestException('Invalid name');
        }

        if (!this.dateOfBirth) {
            throw new BadRequestException('Invalid date of birth');
        }
    }
}

module.exports = CreateRequest;
