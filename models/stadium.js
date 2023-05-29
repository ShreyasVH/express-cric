const mongoose = require('mongoose');

const { CounterModel } = require('./counter');

const stadiumSchema = new mongoose.Schema({
  _id: { type: Number },
  name: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: false },
  countryId: { type: Number, required: true }
},  { collection: 'stadiums' });

stadiumSchema.pre('save', async function (next) {
  const stadium = this;
  try {
    const counter = await CounterModel.findByIdAndUpdate(
      'stadiums',
      { $inc: { sequenceValue: 1 } },
      { new: true, upsert: true }
    );
    stadium._id = counter.sequenceValue;
    next();
  } catch (error) {
    console.error('Failed to generate stadium ID:', error);
    throw error;
  }
});

const StadiumModel = mongoose.model('Stadium', stadiumSchema);

class Stadium {
  constructor(createRequest) {
    this.name = createRequest.name;
    this.city = createRequest.city;
    this.state = createRequest.state;
    this.countryId = createRequest.countryId;
  }
}

module.exports = {
  StadiumModel,
  Stadium
};
