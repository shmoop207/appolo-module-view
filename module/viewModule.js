"use strict";
var ViewModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewModule = void 0;
const tslib_1 = require("tslib");
const engine_1 = require("@appolo/engine");
const enums_1 = require("./src/enums");
let ViewModule = ViewModule_1 = class ViewModule extends engine_1.Module {
    constructor() {
        super(...arguments);
        this.Defaults = {
            viewFolder: "views",
            viewCache: true,
            viewExt: "html",
            viewEngine: enums_1.ViewEngines.nunjucks,
            maxPathCache: 1000,
        };
    }
    static for(options) {
        return { type: ViewModule_1, options };
    }
};
ViewModule = ViewModule_1 = tslib_1.__decorate([
    engine_1.module()
], ViewModule);
exports.ViewModule = ViewModule;
//# sourceMappingURL=viewModule.js.map