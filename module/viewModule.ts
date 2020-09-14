import {Module, module,IModuleParams,IModuleOptions} from "@appolo/engine";
import {IOptions} from "../index";
import {ViewEngines} from "./src/enums";

@module()
export class ViewModule extends Module<IOptions> {

    protected readonly Defaults: Partial<IOptions> = {
        viewFolder: "views",
        viewCache: true,
        viewExt: "html",
        viewEngine: ViewEngines.nunjucks,
        maxPathCache: 1000,
    };



    public static for(options: IOptions, moduleOptions: IModuleOptions = {}): IModuleParams {
        return {module:ViewModule,options,moduleOptions}
    }
}
