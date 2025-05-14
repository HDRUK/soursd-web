"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BannerMessage;
var jsx_runtime_1 = require("react/jsx-runtime");
var Message_1 = require("@/components/Message");
var cms_1 = require("@/mocks/data/cms");
function BannerMessage(props) {
    return ((0, jsx_runtime_1.jsx)(Message_1.Message, __assign({ variant: "filled", severity: "warning" }, props, { children: (0, cms_1.mockedBannerContent)() })));
}
