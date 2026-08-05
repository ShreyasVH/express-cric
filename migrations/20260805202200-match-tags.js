module.exports = {
    async up(db, client) {
        await db.collection('tags').updateMany({ name: { $in: ['FINAL', 'SEMI_FINAL', 'QUARTER_FINAL', 'KNOCKOUT', 'ELIMINATOR', 'THIRD_PLACE', 'QUALIFIER', 'QUALIFIER_1', 'QUALIFIER_2', 'CHALLENGER'] } }, { "$set": { type: 'MATCH' } });
    },

    async down(db, client) {
        await db.collection('tags').updateMany({ name: { $in: ['FINAL', 'SEMI_FINAL', 'QUARTER_FINAL', 'KNOCKOUT', 'ELIMINATOR', 'THIRD_PLACE', 'QUALIFIER', 'QUALIFIER_1', 'QUALIFIER_2', 'CHALLENGER'] } }, { "$unset": { type: '' } });
    }
};
