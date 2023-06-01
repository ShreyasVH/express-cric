module.exports = {
  async up(db, client) {
    await db.createCollection('teamTypes');

    await db.collection('teamTypes').insertMany([
      { _id: 1, name: 'International' },
      { _id: 2, name: 'Domestic' },
      { _id: 3, name: 'Franchise' }
    ]);

    await db.collection('counters').insertOne({
      _id: 'teamTypes',
      sequenceValue: 3
    });
  },

  async down(db, client) {
    await db.collection('teamTypes').deleteMany({});

    await db.collection('counters').deleteOne({
      _id: 'teamTypes'
    });

    await db.collection('teamTypes').drop();
  }
};
