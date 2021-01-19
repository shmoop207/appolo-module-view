"use strict";
import {ViewModule} from "./module/viewModule";
import {ViewEngines} from "./module/src/enums";
import {view} from "./module/src/decorators"
import {IResponse} from "@appolo/route"

export interface IOptions  {
    viewFolder?: string
    viewCache?: boolean
    viewExt?: string
    maxPathCache?: number,
    viewEngine?: ViewEngines,


}

export {ViewModule , view, ViewEngines}

declare module "@appolo/route"{
    interface IResponse{
        render(path: string | string[], params?: any)

        render(params?: any): Promise<void>
    }
}


