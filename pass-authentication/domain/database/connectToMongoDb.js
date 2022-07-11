const { MongoClient } = require("mongodb");

async function run(callback) {
    const mongoClient = new MongoClient(process.env.COMMON_MONGODB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    try {

      // Connect the client to the server (optional starting in v4.7)
      await mongoClient.connect();
      
      await callback(mongoClient);

    } finally {
      // Ensures that the client will close when you finish/error
      await mongoClient.close();
    }
  }

module.exports = run