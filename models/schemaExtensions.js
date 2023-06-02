const moment = require('moment');

const dateSchema = {
  type: Date,
  required: true,
  get: function (value) {
    return moment.utc(value).format('YYYY-MM-DD HH:mm:ss');
  },
  set: function (value) {
    return moment.utc(value, 'YYYY-MM-DD HH:mm:ss').toDate();
  }
};

module.exports = {
  dateSchema
};
