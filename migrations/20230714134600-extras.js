module.exports = {
    async up(db, client) {
        await db.createCollection('extras');

        await db.collection('counters').insertOne({
            _id: 'extras',
            sequenceValue: 0
        });
    },

    async down(db, client) {
        await db.collection('counters').deleteOne({
            _id: 'extras'
        });

        await db.collection('extras').drop();
    }
};
