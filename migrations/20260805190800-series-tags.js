module.exports = {
    async up(db, client) {
        await db.collection('tags').updateMany({ name: { $in: ['WORLD_CUP', 'IPL', 'CHAMPIONS_TROPHY', 'BBL', 'ILT20', 'CHAMPIONS_LEAGUE', 'ASIA_CUP', 'WTC', 'CPL'] } }, { "$set": { type: 'SERIES' } });
    },

    async down(db, client) {
        await db.collection('tags').updateMany({ name: { $in: ['WORLD_CUP', 'IPL', 'CHAMPIONS_TROPHY', 'BBL', 'ILT20', 'CHAMPIONS_LEAGUE', 'ASIA_CUP', 'WTC', 'CPL'] } }, { "$unset": { type: '' } });
    }
};
