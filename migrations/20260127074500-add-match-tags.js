module.exports = {
    async up(db, client) {
        await db.collection('tags').insertMany([
            { _id: 9, name: 'FINAL' },
            { _id: 10, name: 'SEMI_FINAL' },
            { _id: 11, name: 'QUARTER_FINAL' },
            { _id: 12, name: 'KNOCKOUT' },
            { _id: 13, name: 'ELIMINATOR' },
            { _id: 14, name: 'THIRD_PLACE' },
            { _id: 15, name: 'QUALIFIER_1' },
            { _id: 16, name: 'QUALIFIER_2' }
        ]);

        await db.collection('counters').insertOne({
            _id: 'tags',
            sequenceValue: 17
        });
    },

    async down(db, client) {
        await db.collection('tags').deleteMany({
            name: { $in: ['FINAL', 'SEMI_FINAL', 'QUARTER_FINAL', 'KNOCKOUT', 'ELIMINATOR', 'THIRD_PLACE', 'QUALIFIER_1', 'QUALIFIER_2'] }
        });

        await db.collection('counters').updateOne(
            { _id: 'tags' },
            { $inc: { sequenceValue: -8 } }
        );
    }
};
