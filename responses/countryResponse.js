class CountryResponse {
  constructor(country) {
    this.id = country._id;
    this.name = country.name;
  }
}

module.exports = CountryResponse;
