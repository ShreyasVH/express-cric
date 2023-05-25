const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequenceValue: { type: Number, default: 1 },
});

const CounterModel = mongoose.model('Counter', counterSchema);

module.exports = {
  CounterModel
}
