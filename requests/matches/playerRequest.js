class CreateRequest {
    constructor(requestBody) {
        this.id = requestBody.id;
        this.teamId = requestBody.teamId;
    }
}

module.exports = CreateRequest;
