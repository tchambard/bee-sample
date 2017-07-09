import * as express from 'express';
import InfoService from "./InfoService";

export default class InfoRouter {
    private service: InfoService;
    public router;

    constructor() {
        this.router = express.Router();
        this.service = new InfoService();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/', (req, res, next) => {
            const infos = this.service.getInfos();
            res.send(infos);
        });

        this.router.get('/:id', (req, res, next) => {
            const id = req.params.id;
            const info = this.service.getInfo(id);
            res.send(info);
        });

        this.router.post('/', (req, res, next) => {
            const info = req.body;
            const infoCreated = this.service.addInfo(info);
            res.status(201).send(infoCreated);
        });

        this.router.delete('/:id', (req, res, next) => {
            const id = req.params.id;
            this.service.removeInfo(id);
            res.status(204);
        });
    }

}