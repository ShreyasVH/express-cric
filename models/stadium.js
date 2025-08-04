const mongoose = require('mongoose');

const stadiumSchema = new mongoose.Schema({
  // _id: { type: Number },
  name: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: false },
  countryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true }
},  { collection: 'stadiums' });

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
