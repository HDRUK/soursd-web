"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var material_1 = require("@mui/material");
var lab_1 = require("@mui/lab");
var FormModal_1 = __importDefault(require("../FormModal"));
var ModalFormButton = function (_a) {
    var buttonText = _a.buttonText, formContent = _a.formContent, onSubmit = _a.onSubmit, _b = _a.isLoading, isLoading = _b === void 0 ? false : _b, icon = _a.icon, tooltipText = _a.tooltipText;
    var _c = (0, react_1.useState)(false), open = _c[0], setOpen = _c[1];
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [icon ? ((0, jsx_runtime_1.jsx)(material_1.Tooltip, { title: tooltipText || "Open Form", children: (0, jsx_runtime_1.jsx)(material_1.IconButton, { disabled: isLoading, onClick: function () { return setOpen(true); }, size: "small", color: "inherit", "aria-label": "icon-button", children: isLoading ? (0, jsx_runtime_1.jsx)(material_1.CircularProgress, { size: 20, color: "inherit" }) : icon }) })) : ((0, jsx_runtime_1.jsx)(lab_1.LoadingButton, { loading: isLoading, disabled: isLoading, variant: "outlined", onClick: function () { return setOpen(true); }, children: buttonText })), (0, jsx_runtime_1.jsx)(FormModal_1.default, { open: open, onClose: function () { return setOpen(false); }, children: formContent({ closeModal: function () { return setOpen(false); }, onSubmit: onSubmit, isLoading: isLoading }) })] }));
};
exports.default = ModalFormButton;
