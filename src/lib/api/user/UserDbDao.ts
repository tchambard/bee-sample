import { wait } from 'f-promise';
import MongoDbAccess from '../../common/MongoDbAccess';
import * as uuid from 'uuid';

export default class UserDbDao {

    constructor() {
        this.collection.ensureIndex({ id: 1 }, { unique: true });
    }

    public list(query?: any, projection?: object): any[] {
        let docs: any = this.collection.find(query);
        if (projection) {
            docs = docs.project(projection);
        }
        return wait(docs.toArray()) as any[];
    }

    public get(id: string): any {
        const doc: any = wait(this.collection.findOne({ id }));
        if (!doc) {
            throw new Error(`User with id ${id} not found: `);
        }
        return doc;
    }

    public insert(user) {
        user.id = uuid.v4();
        const insertResult: any = wait(this.collection.insertOne(user));
        if (insertResult.result.ok === 1) {
            return user;
        }
        throw new Error(`User insertion failed`);
    }

    public delete(id: string): void {
        const deleteResult: any = wait(this.collection.deleteOne({ id }));
        if (deleteResult.result.ok === 0) {
            throw new Error(`User deletion failed`);
        } else if (deleteResult.result.n === 0) {
            throw new Error(`Delete failed: User with id ${id} not found`);
        }
    }

    private get collection(): any {
        return MongoDbAccess.getDbConnection().collection('user');
    }
}
