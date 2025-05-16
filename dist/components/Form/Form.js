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
exports.default = Form;
var jsx_runtime_1 = require("react/jsx-runtime");
var form_1 = require("../../utils/form");
var yup_1 = require("@hookform/resolvers/yup");
var material_1 = require("@mui/material");
var deep_equal_1 = __importDefault(require("deep-equal"));
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var FormCanLeave_1 = __importDefault(require("../FormCanLeave"));
var FormModal_1 = __importDefault(require("../FormModal"));
var Message_1 = require("../Message");
function Form(_a) {
    var children = _a.children, defaultValues = _a.defaultValues, schema = _a.schema, error = _a.error, _b = _a.onSubmit, onSubmit = _b === void 0 ? function () { } : _b, _c = _a.canLeave, canLeave = _c === void 0 ? false : _c, _d = _a.shouldReset, shouldReset = _d === void 0 ? false : _d, _e = _a.shouldResetKeep, shouldResetKeep = _e === void 0 ? false : _e, isModal = _a.isModal, modalProps = _a.modalProps, _f = _a.disabled, disabled = _f === void 0 ? false : _f, restProps = __rest(_a, ["children", "defaultValues", "schema", "error", "onSubmit", "canLeave", "shouldReset", "shouldResetKeep", "isModal", "modalProps", "disabled"]);
    var formOptions = __assign({ defaultValues: defaultValues, disabled: disabled }, (schema && {
        resolver: (0, yup_1.yupResolver)(schema),
    }));
    var methods = (0, react_hook_form_1.useForm)(formOptions);
    var handleSubmit = methods.handleSubmit, reset = methods.reset;
    var prevDefaultValues = (0, react_1.useRef)(defaultValues);
    (0, react_1.useEffect)(function () {
        if (defaultValues && !(0, deep_equal_1.default)(defaultValues, prevDefaultValues.current)) {
            reset(defaultValues);
            prevDefaultValues.current = defaultValues;
        }
    }, [defaultValues, reset]);
    var extendedMethods = __assign(__assign({}, methods), { isFieldRequired: function (fieldName) {
            return schema ? (0, form_1.isFieldRequired)(schema, fieldName) : false;
        } });
    var handleFormSubmit = function (values) {
        onSubmit(values);
        if (shouldResetKeep) {
            reset(values);
        }
        else if (shouldReset) {
            reset(defaultValues);
        }
    };
    var form = ((0, jsx_runtime_1.jsx)(react_hook_form_1.FormProvider, __assign({}, extendedMethods, { children: (0, jsx_runtime_1.jsx)(FormCanLeave_1.default, { canLeave: canLeave, children: (0, jsx_runtime_1.jsxs)(material_1.Box, __assign({ component: "form", onSubmit: function (event) {
                    event.preventDefault();
                    handleSubmit(handleFormSubmit)(event);
                    event.stopPropagation();
                }, autoComplete: "off" }, restProps, { sx: __assign({ display: "flex", flexDirection: "column", gap: 3 }, restProps.sx), children: [error && ((0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(Message_1.Message, { severity: "error", sx: { mb: 3 }, children: error }) })), typeof children === "function"
                        ? children(extendedMethods)
                        : children] })) }) })));
    return isModal ? (0, jsx_runtime_1.jsx)(FormModal_1.default, __assign({}, modalProps, { children: form })) : form;
}
