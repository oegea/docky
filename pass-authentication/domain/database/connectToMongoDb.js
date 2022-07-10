const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.COMMON_MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

async function run(callback) {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      
      callback(client);

    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

module.exports = run