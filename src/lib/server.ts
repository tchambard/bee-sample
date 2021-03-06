import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as logger from 'morgan';
import AppInitializer from './app/AppInitializer';
import {run} from 'f-promise';
import ApiInitializer from "./api/ApiInitializer";
import UserService from "./api/user/UserService";

export default function main() {
    run(() => {
        const app = express();
        startHttpServer(app);
        setupRouters(app);
    }).catch((e) => {
        console.error('Init error', e.stack);
        process.exit(1);
    });
}

function startHttpServer(app) {
    /**
     * Get port from environment and store in Express.
     */

    const port = normalizePort(process.env.PORT || '3000');
    app.set('port', port);

    /**
     * Create HTTP server.
     */

    const server = http.createServer(app);

    /**
     * Listen on provided port, on all network interfaces.
     */

    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

    /**
     * Normalize a port into a number, string, or false.
     */

    function normalizePort(val) {
        const port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }

    /**
     * Event listener for HTTP server "error" event.
     */

    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Event listener for HTTP server "listening" event.
     */

    function onListening() {
        const addr = server.address();
        const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        console.log('Listening on ' + bind);
    }

}


function setupRouters(app) {

    // view engine setup
    app.set('views', path.join(process.cwd(), 'views'));
    app.set('view engine', 'hbs');

    app.use(logger('dev'));
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    app.use(express.static(path.join(process.cwd(), 'public')));

    // setup fiber
    app.use((req, res, next) => {
        run(() => {
            next();
        }).catch((e) => {
            next(e);
        });
    });

    const userService = new UserService();
    app.use('/', new AppInitializer(userService).router);
    app.use('/api', new ApiInitializer(userService).router);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        let err: any = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
        console.error('Application error handler: ', err.stack);
    });

}
