import InfoDbDao from "./InfoDbDao";

export default class InfoService {
    private dbDao: InfoDbDao;

    constructor() {
        this.dbDao = new InfoDbDao;

    }
    public getInfos() {
        return this.dbDao.list();
    }

    public addInfo(info) {

    }

    public getInfo(id) {

    }

    public removeInfo(id) {

    }
}