class PaginatedResponse {
  constructor(totalCount, data, page, limit) {
    this.totalCount = totalCount;
    this.items = data;
    this.page = page;
    this.limit = limit;
  }
}

module.exports = PaginatedResponse;
