class TourMiniResponse {
  constructor(tour) {
    this.id = tour._id;
    this.name = tour.name;
    this.startTime = tour.startTime;
  }
}

module.exports = TourMiniResponse;
