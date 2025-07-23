const mongoose = require('mongoose');

let isConnected = false;

async function connectDatabase() {
  if (isConnected) {
    return; // already connected
  }

  try {
    await mongoose.connect('mongodb://' + process.env.MONGODB_IP + ':' + process.env.MONGODB_PORT + '/' + process.env.MONGODB_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 25,
        serverSelectionTimeoutMS: 3000,  // faster failover
        socketTimeoutMS: 30000, 
    });
    isConnected = true;

    // mongoose.set('debug', function (collectionName, method, query, doc, options) {
    //   const start = Date.now();
    //   const originalCallback = options?.callback;

    //   // Hook into the callback to measure time
    //   if (originalCallback && typeof originalCallback === 'function') {
    //     options.callback = function (...args) {
    //       const now = Date.now();
    //       const duration = now - start;
    //       console.log(`[${new Date().toISOString()}] ${collectionName}.${method}`, {
    //         start,
    //         now,
    //         type: 'callback',
    //         query,
    //         doc,
    //         duration: `${duration}ms`
    //       });
    //       return originalCallback.apply(this, args);
    //     };
    //   } else {
    //     // Fallback log (fire-and-forget ops like inserts)
    //     const now = Date.now();
    //     const duration = now - start;
    //     console.log(`[${new Date().toISOString()}] ${collectionName}.${method}`, {
    //       start,
    //       now,
    //       type: 'insert',
    //       query,
    //       doc,
    //       duration: `${duration}ms`
    //     });
    //   }
    // });

    // const originalExec = mongoose.Query.prototype.exec;
    // mongoose.Query.prototype.exec = async function (...args) {
    //   const start = Date.now();
    //   try {
    //     const result = await originalExec.apply(this, args);
    //     const duration = Date.now() - start;
    //     console.log(`[${new Date().toISOString()}] ${this.model.modelName}.${this.op}`, {
    //       conditions: this.getQuery(),
    //       update: this.getUpdate?.(),
    //       options: this.getOptions?.(),
    //       duration: `${duration}ms`
    //     });
    //     return result;
    //   } catch (err) {
    //     const duration = Date.now() - start;
    //     console.error(`[${new Date().toISOString()}] ${this.model.modelName}.${this.op} FAILED`, {
    //       conditions: this.getQuery(),
    //       duration: `${duration}ms`,
    //       error: err.message
    //     });
    //     throw err;
    //   }
    // };

  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

module.exports = connectDatabase;
