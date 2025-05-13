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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ActionMenu;
var jsx_runtime_1 = require("react/jsx-runtime");
var MoreVert_1 = __importDefault(require("@mui/icons-material/MoreVert"));
var material_1 = require("@mui/material");
var react_1 = require("react");
function ActionMenu(_a) {
    var children = _a.children, onOpen = _a.onOpen, onClose = _a.onClose, trigger = _a.trigger, _b = _a.icon, icon = _b === void 0 ? (0, jsx_runtime_1.jsx)(MoreVert_1.default, {}) : _b, restProps = __rest(_a, ["children", "onOpen", "onClose", "trigger", "icon"]);
    var _c = (0, react_1.useState)(null), anchorEl = _c[0], setAnchorEl = _c[1];
    var ariaLabel = restProps["aria-label"], additionalProps = __rest(restProps, ["aria-label"]);
    var handleOpen = function (_a) {
        var currentTarget = _a.currentTarget;
        setAnchorEl(currentTarget);
        onOpen === null || onOpen === void 0 ? void 0 : onOpen();
    };
    var handleClose = function () {
        setAnchorEl(null);
        onClose === null || onClose === void 0 ? void 0 : onClose();
    };
    return ((0, jsx_runtime_1.jsxs)("span", __assign({}, additionalProps, { children: [!trigger && ((0, jsx_runtime_1.jsx)(material_1.IconButton, { size: "small", onClick: handleOpen, "aria-label": ariaLabel, children: icon })), trigger && ((0, jsx_runtime_1.jsx)("span", { onClick: handleOpen, onKeyDown: handleOpen, role: "button", tabIndex: 0, "aria-label": ariaLabel, children: trigger })), (0, jsx_runtime_1.jsx)(material_1.Menu, { anchorEl: anchorEl, open: !!anchorEl, onClose: handleClose, children: (0, jsx_runtime_1.jsx)(material_1.MenuList, { dense: true, children: children }) })] })));
}
