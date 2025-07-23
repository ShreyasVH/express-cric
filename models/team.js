const mongoose = require('mongoose');

const { CounterModel } = require('./counter');

const teamSchema = new mongoose.Schema({
  // _id: { type: Number },
  name: { type: String, required: true },
  countryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
  typeId: { type: Number, required: true }
},  { collection: 'teams' });

// teamSchema.pre('save', async function (next) {
//   const team = this;
//   try {
//     const counter = await CounterModel.findByIdAndUpdate(
//       'teams',
//       { $inc: { sequenceValue: 1 } },
//       { new: true, upsert: true }
//     );
//     team._id = counter.sequenceValue;
//     next();
//   } catch (error) {
//     console.error('Failed to generate team ID:', error);
//     throw error;
//   }
// });

const TeamModel = mongoose.model('Team', teamSchema);

class Team {
  constructor(createRequest) {
    this.name = createRequest.name;
    this.countryId = createRequest.countryId;
    this.typeId = createRequest.typeId;
  }
}

module.exports = {
  TeamModel,
  Team
};
