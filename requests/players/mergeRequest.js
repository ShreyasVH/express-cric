class MergeRequest {
    constructor(requestBody) {
        this.playerIdToMerge = requestBody.playerIdToMerge;
        this.originalPlayerId = requestBody.originalPlayerId;
    }
}

module.exports = MergeRequest;
