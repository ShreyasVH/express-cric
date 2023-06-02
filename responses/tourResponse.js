class TourResponse {
  constructor(tour) {
    this.id = tour._id;
    this.name = tour.name;
    this.startTime = tour.startTime;
  }
}

module.exports = TourResponse;
