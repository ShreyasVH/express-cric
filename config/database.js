const mongoose = require('mongoose');

let isConnected = false;

async function connectDatabase() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect('mongodb://' + process.env.MONGODB_IP + ':' + process.env.MONGODB_PORT + '/' + process.env.MONGODB_DB, {
      maxPoolSize: 25,
      serverSelectionTimeoutMS: 3000,
      socketTimeoutMS: 30000,
    });
    isConnected = true;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

const getObjectId = idString => {
  return new mongoose.Types.ObjectId(idString);
};

module.exports = {
  connectDatabase,
  getObjectId
};
