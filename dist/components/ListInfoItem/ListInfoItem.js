"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var ListInfoItem_styles_1 = require("./ListInfoItem.styles");
var ListInfoItem = function (_a) {
    var children = _a.children, index = _a.index;
    return ((0, jsx_runtime_1.jsx)(ListInfoItem_styles_1.StyledListInfoItem, { children: (0, jsx_runtime_1.jsx)(ListInfoItem_styles_1.StyledAlert, { icon: (0, jsx_runtime_1.jsx)(ListInfoItem_styles_1.StyledIcon, { children: index }), children: children }) }));
};
exports.default = ListInfoItem;
