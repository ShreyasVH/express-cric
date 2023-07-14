module.exports = {
    async up(db, client) {
        await db.createCollection('captains');

        await db.collection('counters').insertOne({
            _id: 'captains',
            sequenceValue: 0
        });
    },

    async down(db, client) {
        await db.collection('counters').deleteOne({
            _id: 'captains'
        });

        await db.collection('captains').drop();
    }
};
