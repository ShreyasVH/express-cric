const tags = [
    'CPL',
    'CHALLENGER',
    'QUALIFIER'
];

module.exports = {
    async up(db, client) {
        const counterDoc = await db.collection('counters').findOne({ _id: 'tags' });

        const currentCount = counterDoc.sequenceValue;

        await db.collection('tags').insertMany(tags.map((tag, index) => ({
            _id: currentCount + index + 1,
            name: tag
        })));

        await db.collection('counters').updateOne(
            { _id: 'tags' },
            { $inc: { sequenceValue: tags.length } }
        );
    },

    async down(db, client) {
        await db.collection('tags').deleteMany({
            name: { $in: tags }
        });

        await db.collection('counters').updateOne(
            { _id: 'tags' },
            { $inc: { sequenceValue: -1 * tags.length } }
        );
    }
};
