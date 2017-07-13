import {Db, MongoClient} from 'mongodb';
import { wait } from 'f-promise';
import config from '../common/config';

let db;
let futures: Function[] = [];

export default class MongoDbAccess {
    public static registerFuture(fn: Function) {
        futures.push(fn);
    }

    public static getDbConnection() {
        if (!db) {
            const dbUrl = `mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`;
            try {
                db = wait(MongoClient.connect(dbUrl));
                console.log(`Connected to: ${dbUrl}`);
                futures.forEach((fn) => {
                    fn();
                });
                futures = [];

                db.on('close', function () {
                    console.log('Db connection closed');
                    db = null;
                });
                
                db.on('error', function (err) {
                    console.log('Db connection error', err);
                });
                
                db.on('disconnect', function (err) {
                    console.log('Db connection disconnect', err);
                });
                
                db.on('disconnected', function (err) {
                    console.log('Db connection disconnected', err);
                });
                
                db.on('parseError', function (err) {
                    console.log('Db connection parse', err);
                });
                
                db.on('timeout', function (err) {
                    console.log('Db connection timeout', err);
                });

            } catch(e) {
                throw new Error(`Database connection failed.`);
            }
        }
        return db;
    }
}
