"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo_1 = require("appolo");
const request = require("supertest");
const __1 = require("../");
let should = require('chai').should();
describe("socket module Spec", function () {
    let app;
    beforeEach(async () => {
        app = appolo_1.createApp({ root: __dirname, environment: "production", port: 8182 });
        app.error((err, req, res, next) => {
            res.render("notfound");
        });
        await app.module(new __1.ViewModule({ viewFolder: "test/src/views" }));
        await app.launch();
    });
    afterEach(async () => {
        await app.reset();
    });
    it('should render view', async () => {
        let res = await request(app.handle)
            .get('/test/view?test=11');
        res.header["content-type"].should.be.eq('text/html;charset=utf-8');
        res.text.should.be.eq("hello 11");
    });
    it('should render view with path', async () => {
        let res = await request(app.handle)
            .get('/test/view2?test=11');
        res.header["content-type"].should.be.eq('text/html;charset=utf-8');
        res.text.should.be.eq("hello2 11");
    });
    it('should render view with decorator', async () => {
        let res = await request(app.handle)
            .get('/test/view3?test=11');
        res.header["content-type"].should.be.eq('text/html;charset=utf-8');
        res.text.should.be.eq("hello2 11");
    });
    it('should render view with decorator', async () => {
        let res = await request(app.handle)
            .get('/test/view3?test=11');
        res.header["content-type"].should.be.eq('text/html;charset=utf-8');
        res.text.should.be.eq("hello2 11");
    });
    it('should render view with 404', async () => {
        let res = await request(app.handle)
            .get('/test/view333333');
        res.header["content-type"].should.be.eq('text/html;charset=utf-8');
        res.text.should.be.eq("not found");
    });
});
//# sourceMappingURL=spec.js.map