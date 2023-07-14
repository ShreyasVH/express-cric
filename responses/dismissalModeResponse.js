class DismissalModeResponse {
    constructor(dismissalMode) {
        this.id = dismissalMode._id;
        this.name = dismissalMode.name;
    }
}

module.exports = DismissalModeResponse;
