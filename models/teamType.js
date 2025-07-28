const mongoose = require('mongoose');

const teamTypeSchema = new mongoose.Schema({
  _id: { type: Number },
  name: { type: String, required: true }
},  { collection: 'teamTypes' });

const TeamTypeModel = mongoose.model('TeamType', teamTypeSchema);

module.exports = {
  TeamTypeModel
};
