const moment = require('moment');

const dateTimeSchema = {
  type: Date,
  required: true,
  get: function (value) {
    return moment.utc(value).format('YYYY-MM-DD HH:mm:ss');
  },
  set: function (value) {
    return moment.utc(value, 'YYYY-MM-DD HH:mm:ss').toDate();
  }
};

const dateSchema = {
  type: Date,
  required: true,
  get: function (value) {
    return moment.utc(value).format('YYYY-MM-DD');
  },
  set: function (value) {
    return moment.utc(value, 'YYYY-MM-DD').toDate();
  }
};

module.exports = {
  dateSchema,
  dateTimeSchema
};
