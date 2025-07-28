const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  countryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
  typeId: { type: Number, required: true }
},  { collection: 'teams' });

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
