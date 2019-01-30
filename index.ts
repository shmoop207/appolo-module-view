"use strict";
import {ViewModule} from "./module/viewModule";
import {IModuleOptions} from "appolo";
import {ViewEngines} from "./module/src/enums";
import {view} from "./module/src/decorators"

export interface IOptions extends IModuleOptions {
    viewFolder?: string
    viewCache?: boolean
    viewExt?: string
    maxPathCache?: number,
    viewEngine?: ViewEngines,


}

export {ViewModule , view}

