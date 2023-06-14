const mongoose = require('mongoose');

const { dateTimeSchema } = require('./schemaExtensions');

const { CounterModel } = require('./counter');

const tourSchema = new mongoose.Schema({
  _id: { type: Number },
  name: { type: String, required: true },
  startTime: dateTimeSchema
});

tourSchema.pre('save', async function (next) {
  const tour = this;
  try {
    const counter = await CounterModel.findByIdAndUpdate(
      'tours',
      { $inc: { sequenceValue: 1 } },
      { new: true, upsert: true }
    );
    tour._id = counter.sequenceValue;
    next();
  } catch (error) {
    console.error('Failed to generate tour ID:', error);
    throw error;
  }
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
