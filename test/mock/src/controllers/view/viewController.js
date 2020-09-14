"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewController = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const index_1 = require("../../../../../index");
let ViewController = class ViewController extends route_1.StaticController {
    async raw(req, res, route) {
        await res.render({ test: req.query.test });
    }
    async view2(req, res, route) {
        await res.render("raw2", { test: req.query.test });
    }
    async view3(req, res, route) {
        return { test: req.query.test };
    }
    async view4(req, res, route) {
        return { test: req.query.test };
    }
};
tslib_1.__decorate([
    route_1.get("/test/view")
], ViewController.prototype, "raw", null);
tslib_1.__decorate([
    route_1.get("/test/view2")
], ViewController.prototype, "view2", null);
tslib_1.__decorate([
    route_1.get("/test/view3"),
    index_1.view("raw2")
], ViewController.prototype, "view3", null);
tslib_1.__decorate([
    route_1.get("/test/view4"),
    index_1.view()
], ViewController.prototype, "view4", null);
ViewController = tslib_1.__decorate([
    route_1.controller()
], ViewController);
exports.ViewController = ViewController;
//# sourceMappingURL=viewController.js.map