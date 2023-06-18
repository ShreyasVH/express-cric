const BadRequestException = require('../../exceptions/badRequestException');

class CreateRequest {
    constructor(requestBody) {
        this.name = requestBody.name;
        this.homeCountryId = requestBody.homeCountryId;
        this.tourId = requestBody.tourId;
        this.typeId = requestBody.typeId;
        this.gameTypeId = requestBody.gameTypeId;
        this.startTime = requestBody.startTime;
        this.teams = requestBody.teams;
    }

    validate () {
        if (!this.name) {
            throw new BadRequestException('Invalid name');
        }

        if (!this.teams || this.teams.length < 2) {
            throw new BadRequestException('Invalid Teams');
        }

        if (!this.startTime) {
            throw new BadRequestException('Invalid start time');
        }
    }
}

module.exports = CreateRequest;
