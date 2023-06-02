module.exports = {
  async up(db, client) {
    await db.createCollection('tours');

    await db.collection('counters').insertOne({
      _id: 'tours',
      sequenceValue: 0
    });
  },

  async down(db, client) {
    await db.collection('counters').deleteOne({
      _id: 'tours'
    });

    await db.collection('tours').drop();
  }
};
