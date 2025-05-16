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
exports.default = ActionValidationCommentForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var TextareaAutosize_1 = require("@mui/base/TextareaAutosize");
var icons_1 = require("../../consts/icons");
var yup_1 = __importDefault(require("../../config/yup"));
var types_1 = require("../../services/validation_logs/types");
var lab_1 = require("@mui/lab");
var next_intl_1 = require("next-intl");
var Form_1 = __importDefault(require("../Form"));
var FormControlWrapper_1 = __importDefault(require("../FormControlWrapper"));
var NAMESPACE_TRANSLATION_FORM = "ActionValidationCommentForm";
function ActionValidationCommentForm(_a) {
    var onSubmit = _a.onSubmit, _b = _a.isLoading, isLoading = _b === void 0 ? false : _b, selectedAction = _a.selectedAction, setSelectedAction = _a.setSelectedAction;
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_FORM);
    var schema = yup_1.default.object().shape({
        comment: yup_1.default.string().required(),
    });
    var formOptions = {
        defaultValues: {
            comment: "",
        },
    };
    return ((0, jsx_runtime_1.jsx)(Form_1.default, __assign({ onSubmit: onSubmit, schema: schema }, formOptions, { children: (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: "flex", flexDirection: "column", gap: 1, mt: 4 }, children: [(0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { name: "comment", renderField: function (fieldProps) { return ((0, jsx_runtime_1.jsx)(TextareaAutosize_1.TextareaAutosize, { id: "comment", "data-testid": "validation-log-comment-field", value: fieldProps.value, onChange: fieldProps.onChange, placeholder: fieldProps === null || fieldProps === void 0 ? void 0 : fieldProps.placeholder, style: { width: "100%" }, minRows: 8 })); } }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: "flex", gap: 1, justifyContent: "space-between" }, children: [(0, jsx_runtime_1.jsx)(material_1.Button, { "data-testid": "validation-log-cancel-confirm-button", variant: "outlined", onClick: function () { return setSelectedAction(null); }, children: t("cancel") }), (0, jsx_runtime_1.jsx)(lab_1.LoadingButton, { "data-testid": "validation-log-confirm-button", loading: isLoading, type: "submit", variant: "contained", color: selectedAction === types_1.ValidationLogAction.PASS ? "success" : "error", startIcon: selectedAction === types_1.ValidationLogAction.PASS ? ((0, jsx_runtime_1.jsx)(icons_1.VerifyIcon, { sx: { color: "white" } })) : ((0, jsx_runtime_1.jsx)(icons_1.RejectIcon, { sx: { color: "white" } })), children: t("confirm", { action: selectedAction }) })] })] }) })));
}
