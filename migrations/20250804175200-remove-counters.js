module.exports = {
    async up(db, client) {
        await db.collection('counters').drop();
    },

    async down(db, client) {
    }
};
