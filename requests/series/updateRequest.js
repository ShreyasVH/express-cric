const BadRequestException = require('../../exceptions/badRequestException');

class UpdateRequest {
    constructor(requestBody) {
        this.name = requestBody.name;
        this.homeCountryId = requestBody.homeCountryId;
        this.tourId = requestBody.tourId;
        this.typeId = requestBody.typeId;
        this.gameTypeId = requestBody.gameTypeId;
        this.startTime = requestBody.startTime;
        this.teams = requestBody.teams;
        this.manOfTheSeriesList = requestBody.manOfTheSeriesList;
    }

    validate () {
        if (!!this.teams && this.teams.length < 2) {
            throw new BadRequestException('Invalid Teams');
        }
    }
}

module.exports = UpdateRequest;
