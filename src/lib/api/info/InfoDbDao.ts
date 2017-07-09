import * as mongodb from 'mongodb';
import { wait } from 'f-promise';
import MongoDbAccess from '../../common/MongoDbAccess';

export default class InfoDbDao {
    private db: any;
    private collection: any;

    constructor() {
        this.db = MongoDbAccess.getDbConnection();
        this.collection = this.db.collection('info');
    }


    public list(query?: any, projection?: object): any[] {
        let docs: any = this.collection.find(query);
        if (projection) {
            docs = docs.project(projection);
        }
        return wait(docs.toArray()) as any[];
    }

    public get(query: object): any {
        const doc: any = wait(this.collection.findOne(query));
        if (!doc) {
            throw new Error(`Info with query ${JSON.stringify(query)} not found: `);
        }
        return doc;
    }

    public insert(info) {
        const insertResult: any = wait(this.collection.insertOne(info));
        if (insertResult.result.ok === 1) {
            return info;
        }
        throw new Error(`Info insertion failed`);
    }

    public delete(query: object): void {
        const deleteResult: any = wait(this.collection.deleteOne(query));
        if (deleteResult.result.ok === 0) {
            throw new Error(`Info deletion failed`);
        } else if (deleteResult.result.n === 0) {
            throw new Error(`Info with query ${JSON.stringify(query)} not found`);
        }
    }
}
