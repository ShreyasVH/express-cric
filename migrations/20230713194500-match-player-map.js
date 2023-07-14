module.exports = {
    async up(db, client) {
        await db.createCollection('matchPlayerMap');

        await db.collection('counters').insertOne({
            _id: 'matchPlayerMap',
            sequenceValue: 0
        });
    },

    async down(db, client) {
        await db.collection('counters').deleteOne({
            _id: 'matchPlayerMap'
        });

        await db.collection('matchPlayerMap').drop();
    }
};
