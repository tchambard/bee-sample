import * as express from 'express';

export default class IndexRouter {
    public router;

    constructor() {
        this.router = express.Router();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/', (req, res, next) => {
            res.render('index', {title: 'Express'});
        });
    }

}