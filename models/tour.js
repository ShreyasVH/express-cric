const mongoose = require('mongoose');

const { dateTimeSchema } = require('./schemaExtensions');

const tourSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startTime: dateTimeSchema
});

const TourModel = mongoose.model('Tour', tourSchema);

class Tour {
  constructor(createRequest) {
    this.name = createRequest.name;
    this.startTime = createRequest.startTime;
  }
}

module.exports = {
  TourModel,
  Tour
};
