import UserDbDao from "./UserDbDao";

export default class UserService {
    private dao: UserDbDao;

    constructor() {
        this.dao = new UserDbDao;
    }

    public getUsers() {
        return this.dao.list();
    }

    public addUser(info) {
        return this.dao.insert(info);
    }

    public getUser(id) {
        return this.dao.get(id);
    }

    public removeUser(id) {
        return this.dao.delete(id);
    }
}