module.exports = {
  async up(db, client) {
    await db.createCollection('teams');

    await db.collection('counters').insertOne({
      _id: 'teams',
      sequenceValue: 0
    });
  },

  async down(db, client) {
    await db.collection('counters').deleteOne({
      _id: 'teams'
    });

    await db.collection('teams').drop();
  }
};

