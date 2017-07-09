import {Db, MongoClient} from 'mongodb';
import { wait } from 'f-promise';
import config from '../common/config';

let db;

export default class MongoDbAccess {
    public static getDbConnection() {
        if (!db) {
            const dbUrl = `mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`;
            console.log(`Initializing db: ${dbUrl}`);
            db = wait(MongoClient.connect(dbUrl));
        }
        return db;
    }
}
