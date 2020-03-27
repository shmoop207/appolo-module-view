import {Module, module} from "appolo/index";
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


    constructor(opts?: IOptions) {
        super(opts);
    }

    public static for(opts?: IOptions):ViewModule{
        return new ViewModule(opts)
    }
}
