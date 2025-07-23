const mongoose = require('mongoose');

const { CounterModel } = require('./counter');

const countrySchema = new mongoose.Schema({
  // _id: { type: Number },
  name: { type: String, required: true }
});

// countrySchema.pre('save', async function (next) {
//   const country = this;
//   try {
//     const counter = await CounterModel.findByIdAndUpdate(
//       'countries',
//       { $inc: { sequenceValue: 1 } },
//       { new: true, upsert: true }
//     );
//     country._id = counter.sequenceValue;
//     next();
//   } catch (error) {
//     console.error('Failed to generate country ID:', error);
//     throw error;
//   }
// });

const CountryModel = mongoose.model('Country', countrySchema);

class Country {
  constructor(createRequest) {
    this.name = createRequest.name;
  }
}

module.exports = {
  CountryModel,
  Country
};
