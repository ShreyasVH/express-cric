const mongoose = require('mongoose');

const { CounterModel } = require('./counter');

const configureAutoIncrement = (schemaObject, entityName) => {
    schemaObject.pre('save', async function (next) {
        const entity = this;
        try {
            const counter = await CounterModel.findByIdAndUpdate(
                entityName,
                { $inc: { sequenceValue: 1 } },
                { new: true, upsert: true }
            );
            entity._id = counter.sequenceValue;
            next();
        } catch (error) {
            console.error('Failed to generate ' + entityName + ' ID:', error);
            throw error;
        }
    });
}


module.exports = {
    configureAutoIncrement
};
