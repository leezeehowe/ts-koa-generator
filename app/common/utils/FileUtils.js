"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function changeSuffix(source, target_suffix_without_point) {
    var index = source.lastIndexOf(".");
    return source.slice(0, index) + "." + target_suffix_without_point;
}
exports.changeSuffix = changeSuffix;
//# sourceMappingURL=FileUtils.js.map