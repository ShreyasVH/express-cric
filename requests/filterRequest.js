class FilterRequest {
    constructor(requestBody) {
        this.type = requestBody.type;
        this.offset = requestBody.offset ?? 0;
        this.count = requestBody.count ?? 30;
        this.filters = requestBody.filters ?? {};
        this.rangeFilters = requestBody.rangeFilters ?? {};
        this.sortMap = requestBody.sortMap ?? {}
    }
}

module.exports = FilterRequest;
