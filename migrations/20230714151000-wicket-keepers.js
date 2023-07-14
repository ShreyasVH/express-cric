module.exports = {
    async up(db, client) {
        await db.createCollection('wicketKeepers');

        await db.collection('counters').insertOne({
            _id: 'wicketKeepers',
            sequenceValue: 0
        });
    },

    async down(db, client) {
        await db.collection('counters').deleteOne({
            _id: 'wicketKeepers'
        });

        await db.collection('wicketKeepers').drop();
    }
};
