class WinMarginTypeResponse {
    constructor(winMarginType) {
        this.id = winMarginType._id;
        this.name = winMarginType.name;
    }
}

module.exports = WinMarginTypeResponse;
