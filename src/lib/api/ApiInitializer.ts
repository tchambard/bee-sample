import * as express from 'express';
import UserRoutes from "./user/UserRoutes";
import { run } from 'f-promise';
import UserService from "./user/UserService";

export default class ApiInitializer {

    public router: any;

    constructor(userService: UserService) {
        this.router = express.Router();
        this.setupErrorHandler();
        new UserRoutes(this.router, userService);
    }

    private setupErrorHandler() {
        this.router.use((err, req, res, next) => {
            console.error('API error handler:', err.stack);
            res.status(500).json({
                $diagnoses: [{
                    $severity: 'error',
                    $message: req.app.get('env') === 'development' ? err.message : undefined,
                    $code: err.code,
                    $stack: req.app.get('env') === 'development' ? err.stack : undefined,
                }],
            });
        });
    }
}