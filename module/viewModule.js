"use strict";
var ViewModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("appolo/index");
const enums_1 = require("./src/enums");
let ViewModule = ViewModule_1 = class ViewModule extends index_1.Module {
    constructor(opts) {
        super(opts);
        this.Defaults = {
            viewFolder: "views",
            viewCache: true,
            viewExt: "html",
            viewEngine: enums_1.ViewEngines.nunjucks,
            maxPathCache: 1000,
        };
    }
    static for(opts) {
        return new ViewModule_1(opts);
    }
};
ViewModule = ViewModule_1 = tslib_1.__decorate([
    index_1.module()
], ViewModule);
exports.ViewModule = ViewModule;
//# sourceMappingURL=viewModule.js.map