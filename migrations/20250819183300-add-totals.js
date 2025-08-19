module.exports = {
    async up(db, client) {
        await db.createCollection('totals');
    },

    async down(db, client) {
        await db.collection('totals').drop();
    }
};
