module.exports = {
    async up(db, client) {
        await db.collection('resultTypes').insertMany([
            { _id: 8, name: 'Least Wickets' },
            { _id: 9, name: 'Boundary Count' }
        ]);

        await db.collection('counters').updateOne(
            { _id: 'result_types' },
            { $inc: { sequenceValue: 2 } }
        );
    },

    async down(db, client) {
        await db.collection('resultTypes').deleteMany({
            name: { $in: ['Least Wickets', 'Boundary Count'] }
        });

        await db.collection('counters').updateOne(
            { _id: 'result_types' },
            { $inc: { sequenceValue: -2 } }
        );
    }
};
