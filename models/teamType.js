const mongoose = require('mongoose');

const { CounterModel } = require('./counter');

const teamTypeSchema = new mongoose.Schema({
  _id: { type: Number },
  name: { type: String, required: true }
},  { collection: 'teamTypes' });

teamTypeSchema.pre('save', async function (next) {
  const teamType = this;
  try {
    const counter = await CounterModel.findByIdAndUpdate(
      'teamTypes',
      { $inc: { sequenceValue: 1 } },
      { new: true, upsert: true }
    );
    teamType._id = counter.sequenceValue;
    next();
  } catch (error) {
    console.error('Failed to generate team type ID:', error);
    throw error;
  }
});

const TeamTypeModel = mongoose.model('TeamType', teamTypeSchema);

module.exports = {
  TeamTypeModel
};
