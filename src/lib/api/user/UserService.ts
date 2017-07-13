import UserDbDao from './UserDbDao';
import ImageFsDao from './ImageFsDao';
import * as uuid from 'uuid';

export default class UserService {
    private userDbDao: UserDbDao;
    private imageFsDao: ImageFsDao;

    constructor() {
        this.userDbDao = new UserDbDao();
        this.imageFsDao = new ImageFsDao();
    }

    public getUsers() {
        return this.userDbDao.list().map((user) => {
            return this.replacePhotoPathWithBase64(user);
        });
    }

    public addUser(user) {

        let userInfos: any = {
            id: uuid.v4(),
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
        };

        if (user.photo) {
            try {
                const content = user.photo.indexOf(';base64') !== -1 ? user.photo.split(';base64')[1] : user.photo;
                userInfos.photo = this.imageFsDao.insert(userInfos.id, content);
            } catch(e) {
                console.error(`An error occured while writing image file for user ${user.firstname} ${user.lastname}`, e.stack);
            }
        }
        return this.userDbDao.insert(userInfos);
    }

    public getUser(id) {
        const user = this.userDbDao.get(id);
        return this.replacePhotoPathWithBase64(user);
    }

    public removeUser(id) {
        this.imageFsDao.remove(id);
        return this.userDbDao.delete(id);
    }

    private replacePhotoPathWithBase64(user) {
        if (user.photo) {
            user.photo = 'data:image/png;base64,' + this.imageFsDao.getBase64(user.photo);
        }
        return user;
    }
}