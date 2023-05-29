module.exports = {
  async up(db, client) {
    await db.createCollection('stadiums');

    await db.collection('counters').insertOne({
      _id: 'stadiums',
      sequenceValue: 0
    });
  },

  async down(db, client) {
    await db.collection('counters').deleteOne({
      _id: 'stadiums'
    });

    await db.collection('stadiums').drop();
  }
};
