import {Collection, Db, InsertOneWriteOpResult} from "mongodb";
import { wait } from 'f-promise';

export default class InfoDbDao {
    private db: Db;
    private collection: Collection<any, any>;

    constructor(dbAccess: Db) {
        this.db = dbAccess;
        this.collection = this.db.collection('info');
    }

    createInfo(info) {
        const insertResult: InsertOneWriteOpResult = wait(this.collection.insertOne(info));
        if (insertResult.result.ok === 1) {
            return info;
        }
        throw new Error(`Info insertion failed`);
    }
}