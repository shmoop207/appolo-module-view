
import fs = require("fs");
import {promisify} from 'util';

export class Util {
    public static async lookup(paths: string[]): Promise<string> {

        let path = paths.shift();

        if (!path) {
            return null;
        }

        let isExist = await Util.isFileExist(path);

        if (isExist) {
            return path;
        }

        return Util.lookup(paths);

    }

    public static async isFileExist(path: string): Promise<boolean> {

        try {
            let result: fs.Stats = await promisify(fs.stat)(path);
            return result.isFile();
        } catch (e) {
            return false;
        }
    }
}