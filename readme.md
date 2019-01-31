appolo view module
## Installation
the view engine must be installed in  `package.json` in the example `npm i nunjucks`.

```javascript
npm i @appolo/view
npm i nunjucks
```

## Options
| key | Description | Type | Default
| --- | --- | --- | --- |
| `viewFolder` | view folder to search the view paths | `string`|  `views`|
| `viewCache` | cache the compiled views | `boolean` | `true` |
| `viewExt` | views files extension | `string` | `html` |
| `viewEngine` | the view engine to be used from [list](https://github.com/tj/consolidate.js)| `string` | `nunjucks` |
| `maxPathCache` | max number of cached view paths | `number` | `1000` |

in config/modules/all.ts

```javascript
import {App} from 'appolo';
import {ViewModule,ViewEngines} from '@appolo/view';

export = async function (app:App) {

    await app.module(new ViewModule({
        viewEngine:ViewEngines.nunjucks
    });
}
```

## Usage

now you can use the res.render function in the controller
```javascript
import {controller, inject, IResponse, get, StaticController} from 'appolo';

@controller()
export class ViewController extends StaticController {

    @get("/test/view")
    async someView(req, res: IResponse, route) {
        await res.render("path to view", {test: req.query.test}
    }
}

```

if the path is not defined the view will be searched in the same folder as the controller and file name as the action in the example below it will search for `view2.html`
```javascript
import {controller, inject, IResponse, get, StaticController} from 'appolo';

@controller()
export class ViewController extends StaticController {

    @get("/test/view2")
    async view2(req, res: IResponse, route) {
        await res.render( {test: req.query.test}
    }
}
```

the view can be rendered with `view` decorator
```javascript
import {controller, inject, IResponse, get, StaticController} from 'appolo';
import {view} from '@appolo/view';


@controller()
export class ViewController extends StaticController {

    @get("/test/view2")
    @view("some path")
    view(req, res: IResponse, route) {
       return {test: req.query.test}
    }
}
```
promises also supported
```javascript
import {controller, inject, IResponse, get, StaticController} from 'appolo';
import {view} from '@appolo/view';

@controller()
export class ViewController extends StaticController {

    @get("/test/view2")
    @view()
    async view(req, res: IResponse, route) {
       let result  = await doSomeThingAsync();
       return result
    }
}
```