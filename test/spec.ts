import {App, createApp} from 'appolo'
import * as request from 'supertest';
import {ViewModule} from '../'

let should = require('chai').should();


describe("socket module Spec", function () {

    let app: App;

    beforeEach(async () => {

        app = createApp({root: __dirname , environment: "production", port: 8182});

        await app.module(new ViewModule());

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

});

