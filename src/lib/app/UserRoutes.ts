import UserService from "../api/user/UserService";

export default class UserRoutes {
    private service: UserService;
    private router: any;
    private baseUrl = '/user';


    constructor(router) {
        this.router = router;
        this.service = new UserService();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get(`${this.baseUrl}/list`, (req, res) => {
            const users = this.service.getUsers();
            res.render('user/list', { users });
        });

        this.router.get(`${this.baseUrl}/create`, (req, res,) => {
            res.render('user/create');
        });
/*
        this.router.post(`${this.baseUrl}`, (req, res) => {
            const user = req.body;
            const userCreated = this.service.addUser(user);
            res.status(201).send(userCreated);
        });

        this.router.delete(`${this.baseUrl}/:id`, (req, res) => {
            const id = req.params.id;
            this.service.removeUser(id);
            res.status(204);
        });
        */
    }

}
