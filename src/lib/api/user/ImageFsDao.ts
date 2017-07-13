import config from '../../common/config';
import * as path from 'path';
import * as fs from 'fs-extra';
import { wait } from 'f-promise';

export default class ImageFsDao {
    private directory: string;

    constructor() {
        this.directory = path.join(config.storage, 'images');
    }

    public insert(userId: string, base64Data: string) {
        const filePath = path.join(this.directory, userId)
        wait(fs.writeFile(filePath, Buffer.from(base64Data, 'base64')));
        return filePath;
    }

    public getBase64(imagePath: string) {
        const fileContent: any = wait(fs.readFile(imagePath));
        return new Buffer(fileContent).toString('base64');
    }

    public remove(userId: string): void {
        const filePath = path.join(this.directory, userId);
        wait(fs.unlink(filePath));
    }
}