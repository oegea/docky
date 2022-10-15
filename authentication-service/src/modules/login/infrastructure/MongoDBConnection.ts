import {MongoClient} from 'mongodb'

class MongoDBConnection {
    static connection: any = null;
    static isConnected

    static isNotConnected() {
        return (
            MongoDBConnection.connection === null
        )
    }

    static onDisconnect() {
        MongoDBConnection.connection = null
    }
    
    static getConnection() {

        if (MongoDBConnection.isNotConnected()){     
            MongoDBConnection.connection = new MongoClient(process.env.COMMON_MONGODB_CONNECTION_STRING)
            
            MongoDBConnection.connection.on('topologyClosed', MongoDBConnection.onDisconnect)
        }
        return MongoDBConnection.connection
    }
}

export {MongoDBConnection}