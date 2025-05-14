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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var next_intl_1 = require("next-intl");
var yup_1 = __importDefault(require("@/config/yup"));
var Form_1 = __importDefault(require("@/components/Form"));
var material_1 = require("@mui/material");
var TextareaAutosize_1 = require("@mui/base/TextareaAutosize");
var FormControlWrapper_1 = __importDefault(require("@/components/FormControlWrapper"));
var lab_1 = require("@mui/lab");
var react_1 = require("react");
var SelectValidationActionStatus_1 = __importDefault(require("@/components/SelectValidationActionStatus"));
var NAMESPACE_TRANSLATION_ACTION_VALIDATION = "ActionValidationPanel";
var ActionValidationStatus = function (_a) {
    var useApprovalHook = _a.useApprovalHook, hookParams = _a.hookParams;
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_ACTION_VALIDATION);
    var _b = useApprovalHook(hookParams), data = _b.data, approve = _b.approve, reject = _b.reject, isLoading = _b.isLoading;
    var schema = yup_1.default.object().shape({
        status: yup_1.default.number().required(),
        comment: yup_1.default.string().required(),
    });
    var _c = (0, react_1.useState)(0), initialStatus = _c[0], setInitialStatus = _c[1];
    (0, react_1.useEffect)(function () {
        if (isLoading)
            return;
        setInitialStatus((data === null || data === void 0 ? void 0 : data.approved) || 0);
    }, [data]);
    var _d = (0, react_1.useState)(0), currentStatus = _d[0], setCurrentStatus = _d[1];
    (0, react_1.useEffect)(function () {
        setCurrentStatus(initialStatus);
    }, [initialStatus]);
    var formOptions = (0, react_1.useMemo)(function () { return ({
        shouldReset: false,
        defaultValues: {
            status: initialStatus,
            comment: "",
        },
    }); }, [initialStatus]);
    var handleSubmit = function (formData) {
        var status = formData.status, comment = formData.comment;
        if (status === 1) {
            approve(comment);
        }
        else {
            reject(comment);
        }
    };
    return ((0, jsx_runtime_1.jsx)(material_1.Box, { sx: { p: 2 }, children: (0, jsx_runtime_1.jsxs)(Form_1.default, __assign({ schema: schema, onSubmit: handleSubmit }, formOptions, { children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { name: "status", renderField: function (fieldProps) { return ((0, jsx_runtime_1.jsx)(SelectValidationActionStatus_1.default, __assign({ isLoading: isLoading }, fieldProps, { handleChange: function (value) { return setCurrentStatus(value); } }))); } }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { name: "comment", renderField: function (fieldProps) { return ((0, jsx_runtime_1.jsx)(TextareaAutosize_1.TextareaAutosize, { id: "comment", value: fieldProps.value, onChange: fieldProps.onChange, placeholder: fieldProps === null || fieldProps === void 0 ? void 0 : fieldProps.placeholder, style: { width: "100%" }, minRows: 8 })); } }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(lab_1.LoadingButton, { loading: isLoading, disabled: currentStatus === initialStatus, type: "submit", sx: { display: "flex", justifySelf: "end" }, children: t("updateStatusButton") }) })] })) }));
};
exports.default = ActionValidationStatus;
