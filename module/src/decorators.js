"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.view = void 0;
require("reflect-metadata");
function view(path) {
    return function (target, propertyKey, descriptor) {
        let old = descriptor.value;
        descriptor.value = async function (req, res) {
            let result = await old.apply(this, arguments);
            path ? res.render(path, result) : res.render(result);
        };
    };
}
exports.view = view;
//# sourceMappingURL=decorators.js.map