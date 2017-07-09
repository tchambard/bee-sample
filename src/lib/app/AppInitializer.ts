import * as express from 'express';
import UserRoutes from "./UserRoutes";

export default class AppInitializer {
    public router;
    private userRoutes: UserRoutes;

    constructor() {
        this.router = express.Router();
        this.initRoutes();
        this.userRoutes = new UserRoutes(this.router);
    }

    private initRoutes() {
        this.router.get('/', (req, res, next) => {
           res.render('index', {title: 'Bee sample application'});
        });

        new UserRoutes(this.router);
    }

}