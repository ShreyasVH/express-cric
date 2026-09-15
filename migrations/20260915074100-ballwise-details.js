module.exports = {
    async up(db, client) {
        await db.createCollection('ballwiseDetails');
    },

    async down(db, client) {
        await db.collection('ballwiseDetails').drop();
    }
};

