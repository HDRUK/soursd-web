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
exports.default = ProfessionalRegistrationsForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var ButtonSave_1 = __importDefault(require("@/components/ButtonSave"));
var Form_1 = __importDefault(require("@/components/Form"));
var FormActions_1 = __importDefault(require("@/components/FormActions"));
var FormControlHorizontal_1 = __importDefault(require("@/components/FormControlHorizontal"));
var FormSection_1 = __importDefault(require("@/components/FormSection"));
var yup_1 = __importDefault(require("@/config/yup"));
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var react_1 = require("react");
var NAMESPACE_TRANSLATION_PROFILE = "ProfessionalRegistrations";
function ProfessionalRegistrationsForm(_a) {
    var onSubmit = _a.onSubmit, onClose = _a.onClose, queryState = _a.queryState, data = _a.data, isEdit = _a.isEdit;
    var tProfile = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_PROFILE);
    var schema = (0, react_1.useMemo)(function () {
        return yup_1.default.object().shape({
            member_id: yup_1.default.string().required(tProfile("memberIdRequiredInvalid")),
            name: yup_1.default.string().required(tProfile("nameRequiredInvalid")),
        });
    }, [tProfile]);
    var formOptions = {
        defaultValues: __assign({ member_id: (data === null || data === void 0 ? void 0 : data.member_id) || "", name: (data === null || data === void 0 ? void 0 : data.name) || "" }, data),
    };
    return ((0, jsx_runtime_1.jsxs)(Form_1.default, __assign({ onSubmit: onSubmit, schema: schema }, formOptions, { sx: { mb: 3 }, shouldReset: !isEdit, children: [(0, jsx_runtime_1.jsx)(FormSection_1.default, { heading: tProfile("title"), children: (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, rowSpacing: 3, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormControlHorizontal_1.default, { name: "name", tNamespace: NAMESPACE_TRANSLATION_PROFILE, renderField: function (fieldProps) { return (0, jsx_runtime_1.jsx)(material_1.TextField, __assign({}, fieldProps)); } }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormControlHorizontal_1.default, { name: "member_id", tNamespace: NAMESPACE_TRANSLATION_PROFILE, renderField: function (fieldProps) { return (0, jsx_runtime_1.jsx)(material_1.TextField, __assign({}, fieldProps)); } }) })] }) }), (0, jsx_runtime_1.jsxs)(FormActions_1.default, { sx: { display: "flex", justifyContent: "space-between" }, children: [(0, jsx_runtime_1.jsx)(material_1.Button, { onClick: onClose, variant: "outlined", children: tProfile("cancel") }), (0, jsx_runtime_1.jsx)(ButtonSave_1.default, { isLoading: queryState.isPending })] })] })));
}
