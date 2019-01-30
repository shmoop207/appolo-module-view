"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo_1 = require("appolo");
const index_1 = require("../../../../index");
let ViewController = class ViewController extends appolo_1.StaticController {
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
    appolo_1.get("/test/view")
], ViewController.prototype, "raw", null);
tslib_1.__decorate([
    appolo_1.get("/test/view2")
], ViewController.prototype, "view2", null);
tslib_1.__decorate([
    appolo_1.get("/test/view3"),
    index_1.view("raw2")
], ViewController.prototype, "view3", null);
tslib_1.__decorate([
    appolo_1.get("/test/view4"),
    index_1.view()
], ViewController.prototype, "view4", null);
ViewController = tslib_1.__decorate([
    appolo_1.controller()
], ViewController);
exports.ViewController = ViewController;
//# sourceMappingURL=viewController.js.map