const mongoose = require('mongoose');

const dismissalModeSchema = new mongoose.Schema({
    _id: { type: Number },
    name: { type: String, required: true }
},  { collection: 'dismissalModes' });

const DismissalModeModel = mongoose.model('DismissalMode', dismissalModeSchema);

module.exports = {
    DismissalModeModel
};
