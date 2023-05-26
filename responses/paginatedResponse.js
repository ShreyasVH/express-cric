class PaginatedResponse {
  constructor(totalCount, data, page, limit) {
    this.totalCount = totalCount;
    this.data = data;
    this.page = page;
    this.limit = limit;
  }
}

module.exports = PaginatedResponse;
