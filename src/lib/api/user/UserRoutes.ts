import UserService from "./UserService";

export default class UserRoutes {
    private userService: UserService;
    private router: any;
    private baseUrl = '/user';

    constructor(router, userService: UserService) {
        this.router = router;
        this.userService = userService;
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(`${this.baseUrl}`, (req, res) => {
            const users = this.userService.getUsers();
            res.send(users);
        });

        this.router.get(`${this.baseUrl}/:id`, (req, res,) => {
            const id = req.params.id;
            const user = this.userService.getUser(id);
            res.send(user);
        });

        this.router.post(`${this.baseUrl}`, (req, res) => {
            const user = req.body;
            const userCreated = this.userService.addUser(user);
            res.status(201).send(userCreated);
        });

        this.router.delete(`${this.baseUrl}/:id`, (req, res) => {
            const id = req.params.id;
            this.userService.removeUser(id);
            res.status(204).send();
        });
    }
}
