import * as express from 'express';
import UserRoutes from "./UserRoutes";
import UserService from "../api/user/UserService";

export default class AppInitializer {
    public router;
    private userRoutes: UserRoutes;

    constructor(userService: UserService) {
        this.router = express.Router();
        this.initRoutes();
        this.userRoutes = new UserRoutes(this.router, userService);
    }

    private initRoutes() {
        this.router.get('/', (req, res, next) => {
           res.render('index', {title: 'Bee sample application'});
        });

    }

}