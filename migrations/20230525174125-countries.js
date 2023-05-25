module.exports = {
  async up(db, client) {
    await db.createCollection('countries');

    await db.createCollection('counters');

    await db.collection('counters').insertOne({
      _id: 'countries',
      sequenceValue: 0
    });
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
