"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const util_1 = require("util");
class Util {
    static async lookup(paths) {
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
    static async isFileExist(path) {
        try {
            let result = await util_1.promisify(fs.stat)(path);
            return result.isFile();
        }
        catch (e) {
            return false;
        }
    }
}
exports.Util = Util;
//# sourceMappingURL=util.js.map