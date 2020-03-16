"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transObjectToStr = function (obj) {
    var str = "";
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var element = void 0;
            element = obj[key];
            str += key + " = " + JSON.stringify(element) + "\n";
        }
    }
    return str;
};
//# sourceMappingURL=objectUtils.js.map