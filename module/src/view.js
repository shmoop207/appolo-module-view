"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const core_1 = require("@appolo/core");
const inject_1 = require("@appolo/inject");
const util_1 = require("./util");
const appolo_cache_1 = require("appolo-cache");
const path = require("path");
const consolidate = require("consolidate");
const Path = require("path");
let View = class View {
    init() {
        this._cache = new appolo_cache_1.Cache({ maxSize: this.moduleOptions.maxPathCache });
        let $self = this;
        core_1.Discovery.decorateResponse("render", function (path, params) {
            if (arguments.length == 1 && typeof path !== "string") {
                params = path;
                path = "";
            }
            $self._responseRender(this, path, params);
        });
    }
    _responseRender(res, path, params) {
        res.sending = true;
        let paths = [];
        if (!res.hasHeader("Content-Type")) {
            res.setHeader("Content-Type", "text/html;charset=utf-8");
        }
        if (res.req.route) {
            if (!path) {
                path = res.req.route.actionName;
            }
            if (res.req.route.definition) {
                let controllerDir = Path.parse(res.req.route.definition.path).dir;
                paths.push(Path.resolve(res.req.app.options.root, controllerDir, path));
                paths.push(Path.resolve(res.req.app.options.root, controllerDir, "views", path));
            }
        }
        paths.push(path);
        return this.render(paths, params, res)
            .then((str) => res.send(str))
            .catch((e) => {
            res.sending = false;
            res.req.next(e);
        });
    }
    async render(paths, params, res) {
        try {
            params = params || {};
            let pathsKey = paths.toString();
            let item = null;
            if (res) {
                item = this._cache.peek(pathsKey);
            }
            if (!item) {
                item = await this._findPath(paths);
            }
            if (res) {
                this._cache.set(pathsKey, item);
            }
            let result = await consolidate[this.moduleOptions.viewEngine](item.path, Object.assign({ cache: this.moduleOptions.viewCache }, params));
            return result;
        }
        catch (e) {
            throw new route_1.HttpError(500, `failed to render view ${e.toString()}`);
        }
    }
    async _findPath(paths) {
        let lookPaths = [];
        for (let i = 0, len = paths.length; i < len; i++) {
            let p = paths[i];
            let ext = path.extname(p);
            if (!ext) {
                p += `.${this.moduleOptions.viewExt || "html"}`;
            }
            lookPaths.push(path.resolve(process.cwd(), p));
            lookPaths.push(path.resolve(process.cwd(), this.moduleOptions.viewFolder, p));
        }
        let foundPath = await util_1.Util.lookup(lookPaths.slice());
        if (!foundPath) {
            throw new route_1.HttpError(500, `failed to find view path searched paths ${JSON.stringify(lookPaths)}`);
        }
        if (!this.moduleOptions.viewEngine) {
            throw new route_1.HttpError(500, `tried to call render but view engine is no defined`);
        }
        let item = { path: foundPath };
        return item;
    }
};
tslib_1.__decorate([
    inject_1.inject()
], View.prototype, "moduleOptions", void 0);
tslib_1.__decorate([
    inject_1.init()
], View.prototype, "init", null);
View = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton()
], View);
exports.View = View;
//# sourceMappingURL=view.js.map