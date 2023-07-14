module.exports = {
    async up(db, client) {
        await db.createCollection('dismissalModes');

        await db.collection('dismissalModes').insertMany([
            { _id: 1, name: 'Bowled' },
            { _id: 2, name: 'Caught' },
            { _id: 3, name: 'LBW' },
            { _id: 4, name: 'Run Out' },
            { _id: 5, name: 'Stumped' },
            { _id: 6, name: 'Hit Twice' },
            { _id: 7, name: 'Hit Wicket' },
            { _id: 8, name: 'Obstructing the Field' },
            { _id: 9, name: 'Timed Out' },
            { _id: 10, name: 'Retired Hurt' },
            { _id: 11, name: 'Handled the Ball' }
        ]);

        await db.collection('counters').insertOne({
            _id: 'dismissalModes',
            sequenceValue: 11
        });
    },

    async down(db, client) {
        await db.collection('dismissalModes').deleteMany({});

        await db.collection('counters').deleteOne({
            _id: 'dismissalModes'
        });

        await db.collection('dismissalModes').drop();
    }
};
