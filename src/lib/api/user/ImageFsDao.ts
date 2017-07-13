import config from '../../common/config';
import * as path from 'path';
import * as fs from 'fs-extra';
import { wait } from 'f-promise';

export default class ImageFsDao {
    private directory: string;

    constructor() {
        this.directory = path.join(config.storage, 'images');
    }

    public insert(userId, base64Data) {
        const filePath = path.join(this.directory, userId)
        wait(fs.writeFile(filePath, Buffer.from(base64Data, 'base64')));
        return filePath;
    }

    public getBase64(imagePath) {
        console.log("imagePath:", imagePath);
        const fileContent: any = wait(fs.readFile(imagePath));
        return new Buffer(fileContent).toString('base64');
    }
}