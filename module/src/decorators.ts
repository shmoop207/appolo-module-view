import "reflect-metadata";
import {IRequest, IResponse} from 'appolo';


export function view(path?: string) {
    return function (target: any, propertyKey: string, descriptor?: PropertyDescriptor) {

        let old = descriptor.value;

        descriptor.value = async function (req: IRequest, res: IResponse) {

            let result = await old.apply(this, arguments);

            path ? res.render(path, result) : res.render(result)
        }
    }
}



