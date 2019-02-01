"use strict";
import {define, HttpError, initMethod, inject, IResponse, singleton, Util as AppoloUtil} from 'appolo';
import {IOptions} from "../../index";
import {Util} from "./util";
import {Cache} from "appolo-cache";
import path = require("path");
import  consolidate = require("consolidate");
import    Path = require('path');

@define()
@singleton()
export class View {

    private _cache: Cache<string, { path: string }>;
    @inject() private moduleOptions: IOptions;

    @initMethod()
    private init() {

        this._cache = new Cache({maxSize: this.moduleOptions.maxPathCache});
        let $self = this;
        AppoloUtil.decorateResponse("render", function (path: string, params?: any) {

            if (arguments.length == 1 && typeof path !== "string") {
                params = path;
                path = "";
            }

            $self._responseRender(this, path, params)
        })
    }

    private _responseRender(res: IResponse, path: string, params?: any) {

        res.sending = true;

        let controllerDir = Path.parse(res.req.route.definition.path).dir;

        if (!path && res.req.route) {
            path = res.req.route.actionName;
        }

        let paths = [];


        if (!res.hasHeader("Content-Type")) {
            res.setHeader("Content-Type", "text/html;charset=utf-8")
        }

        if (res.req.route) {
            paths.push(Path.resolve(res.req.app.options.root, controllerDir, path));
            paths.push(Path.resolve(res.req.app.options.root, controllerDir, "views", path));
        }

        paths.push(path);

        return this.render(paths, params, res)
            .then((str: string) => res.send(str))
            .catch((e) => res.req.next(e))
    }

    public async render(paths: string[], params: any, res: IResponse): Promise<string> {

        try {

            params = params || {};

            let pathsKey = paths.toString();

            let item: { path: string } = null;

            if (res) {
                item = this._cache.peek(pathsKey);
            }

            if (!item) {
                item = await this._findPath(paths);
            }
            if (res) {
                this._cache.set(pathsKey, item);
            }

            let result = await consolidate[this.moduleOptions.viewEngine](item.path, {cache: this.moduleOptions.viewCache, ...params});

            return result;


        } catch (e) {
            throw new HttpError(500, `failed to render view ${e.toString()}`)
        }

    }

    private async _findPath(paths: string[]): Promise<{ path: string }> {
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

        let foundPath = await Util.lookup(lookPaths.slice());

        if (!foundPath) {
            throw new HttpError(500, `failed to find view path searched paths ${JSON.stringify(lookPaths)}`)
        }

        if (!this.moduleOptions.viewEngine) {
            throw new HttpError(500, `tried to call render but view engine is no defined`)
        }

        let item = {path: foundPath};

        return item;
    }


}

