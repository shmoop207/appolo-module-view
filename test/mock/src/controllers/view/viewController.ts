"use strict";
import {controller, get, IResponse, StaticController} from '@appolo/route';
import {view} from "../../../../../index";

@controller()
export class ViewController extends StaticController {


    @get("/test/view")
    async raw(req, res: IResponse, route) {

        await res.render({test: req.query.test})

    }

    @get("/test/view2")
    async view2(req, res: IResponse, route) {

        await res.render("raw2", {test: req.query.test})
    }

    @get("/test/view3")
    @view("raw2")
    async view3(req, res: IResponse, route) {

        return {test: req.query.test}
    }

    @get("/test/view4")
    @view()
    async view4(req, res: IResponse, route) {

        return {test: req.query.test}
    }

}


