const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    _id: { type: Number },
    name: { type: String, required: true }
},  { collection: 'tags' });

const TagModel = mongoose.model('Tag', tagSchema);

module.exports = {
    TagModel: TagModel
};
