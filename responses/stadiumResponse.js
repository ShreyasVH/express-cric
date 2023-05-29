class StadiumResponse {
  constructor(stadium, country) {
    this.id = stadium._id;
    this.name = stadium.name;
    this.city = stadium.city;
    this.state = stadium.state;
    this.country = country;
  }
}

module.exports = StadiumResponse;
