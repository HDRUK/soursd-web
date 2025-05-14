"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePathServerSide = usePathServerSide;
var headers_1 = require("next/headers");
function usePathServerSide() {
    var head = (0, headers_1.headers)();
    return head.get("x-current-path");
}
