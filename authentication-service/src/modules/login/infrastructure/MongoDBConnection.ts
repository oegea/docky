import {MongoClient} from 'mongodb'

class MongoDBConnection {
    static connection: any = null;
    
    static getConnection() {

        if (MongoDBConnection.connection === null){      
            console.log(process.env.COMMON_MONGODB_CONNECTION_STRING)       
            MongoDBConnection.connection = new MongoClient(process.env.COMMON_MONGODB_CONNECTION_STRING)
        }
        return MongoDBConnection.connection
    }
}

export {MongoDBConnection}