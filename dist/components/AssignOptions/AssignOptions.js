"use strict";
"use client";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PermissionsSection;
var jsx_runtime_1 = require("react/jsx-runtime");
var ActionList_1 = require("../ActionList");
var form_1 = require("../../utils/form");
var Save_1 = __importDefault(require("@mui/icons-material/Save"));
var lab_1 = require("@mui/lab");
var material_1 = require("@mui/material");
var react_hook_form_1 = require("react-hook-form");
var Message_1 = require("../Message");
function PermissionsSection(_a) {
    var queryState = _a.queryState, parentData = _a.parentData, subsetData = _a.subsetData, onSubmit = _a.onSubmit;
    var checkboxData = parentData.map(function (_a) {
        var label = _a.name, id = _a.id;
        return ({
            label: label,
            id: id.toString(),
        });
    });
    var methods = (0, react_hook_form_1.useForm)({
        defaultValues: (0, form_1.getCheckboxFormValuesFromIntersection)(checkboxData, subsetData),
        disabled: queryState.isLoading,
    });
    var register = methods.register, handleSubmit = methods.handleSubmit;
    return ((0, jsx_runtime_1.jsx)(react_hook_form_1.FormProvider, __assign({}, methods, { children: (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit(onSubmit), children: [queryState.isError && ((0, jsx_runtime_1.jsx)(Message_1.Message, { severity: "error", sx: { mb: 3 }, children: "".concat(queryState.error) })), (0, jsx_runtime_1.jsx)(ActionList_1.ActionList, { sx: { listStyleType: "none", p: 0, m: 0, mb: 2 }, children: checkboxData.map(function (_a) {
                        var label = _a.label, id = _a.id;
                        return ((0, jsx_runtime_1.jsx)(ActionList_1.ActionListItem, { primaryText: label, primaryAction: (0, jsx_runtime_1.jsx)(material_1.Switch, __assign({}, register(id), { checked: methods.watch(id), color: "success", inputProps: {
                                    "aria-label": label,
                                } })) }, id));
                    }) }), (0, jsx_runtime_1.jsx)(lab_1.LoadingButton, { type: "submit", color: "primary", variant: "contained", endIcon: (0, jsx_runtime_1.jsx)(Save_1.default, {}), loading: queryState.isLoading, children: "Save" })] }) })));
}
