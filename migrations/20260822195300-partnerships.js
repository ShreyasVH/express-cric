module.exports = {
    async up(db, client) {
        await db.createCollection('partnerships');
    },

    async down(db, client) {
        await db.collection('partnerships').drop();
    }
};

