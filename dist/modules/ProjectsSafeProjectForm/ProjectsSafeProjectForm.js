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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.default = UserModalDetails;
var jsx_runtime_1 = require("react/jsx-runtime");
var ChipStatus_1 = __importStar(require("@/components/ChipStatus"));
var DateInput_1 = __importDefault(require("@/components/DateInput"));
var Form_1 = __importDefault(require("@/components/Form"));
var FormActions_1 = __importDefault(require("@/components/FormActions"));
var FormControlWrapper_1 = __importDefault(require("@/components/FormControlWrapper"));
var FormFieldArray_1 = __importDefault(require("@/components/FormFieldArray"));
var ProfileNavigationFooter_1 = __importDefault(require("@/components/ProfileNavigationFooter"));
var yup_1 = __importDefault(require("@/config/yup"));
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var react_1 = require("react");
var NAMESPACE_TRANSLATION_FORM = "Form.SafeProject";
function UserModalDetails(_a) {
    var mutateState = _a.mutateState, restProps = __rest(_a, ["mutateState"]);
    var tForm = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_FORM);
    var schema = (0, react_1.useMemo)(function () {
        return yup_1.default.object().shape({
            unique_id: yup_1.default.string().required(tForm("uniqueIdRequiredInvalid")),
            title: yup_1.default.string().required(tForm("titleRequiredInvalid")),
            request_category_type: yup_1.default
                .string()
                .required(tForm("requestCategoryTypeRequiredInvalid")),
            start_date: yup_1.default.string().required(tForm("startDateRequiredInvalid")),
            end_date: yup_1.default.string().required(tForm("endDateRequiredInvalid")),
            lay_summary: yup_1.default.string().required(tForm("laySummaryRequiredInvalid")),
            public_benefit: yup_1.default
                .string()
                .required(tForm("publicBenefitRequiredInvalid")),
            technical_summary: yup_1.default
                .string()
                .required(tForm("technicalSummaryRequiredInvalid")),
            status: yup_1.default.string().required(tForm("statusRequiredInvalid")),
        });
    }, []);
    var formOptions = {
        disabled: mutateState.isPending,
        shouldResetKeep: true,
    };
    return ((0, jsx_runtime_1.jsx)(Form_1.default, __assign({ schema: schema }, formOptions, restProps, { autoComplete: "off", children: (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, columnSpacing: 8, children: [(0, jsx_runtime_1.jsxs)(material_1.Grid, { item: true, md: 8, xs: 12, order: {
                        md: 1,
                        xs: 2,
                    }, children: [(0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, rowSpacing: 3, mb: 5, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { name: "unique_id", t: tForm, renderField: function (fieldProps) { return (0, jsx_runtime_1.jsx)(material_1.TextField, __assign({}, fieldProps)); } }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { name: "title", t: tForm, renderField: function (fieldProps) { return (0, jsx_runtime_1.jsx)(material_1.TextField, __assign({}, fieldProps)); } }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { name: "request_category_type", t: tForm, renderField: function (fieldProps) { return (0, jsx_runtime_1.jsx)(material_1.TextField, __assign({}, fieldProps)); } }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, columnSpacing: 3, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 6, children: (0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { name: "start_date", renderField: function (fieldProps) { return (0, jsx_runtime_1.jsx)(DateInput_1.default, __assign({}, fieldProps)); } }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 6, children: (0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { name: "end_date", renderField: function (fieldProps) { return (0, jsx_runtime_1.jsx)(DateInput_1.default, __assign({}, fieldProps)); } }) })] }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { name: "lay_summary", t: tForm, renderField: function (fieldProps) { return ((0, jsx_runtime_1.jsx)(material_1.TextField, __assign({}, fieldProps, { multiline: true, style: { width: "100%" }, minRows: 6 }))); } }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { name: "public_benefit", t: tForm, renderField: function (fieldProps) { return ((0, jsx_runtime_1.jsx)(material_1.TextField, __assign({}, fieldProps, { style: { width: "100%" }, multiline: true, minRows: 6 }))); } }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { name: "technical_summary", t: tForm, renderField: function (fieldProps) { return ((0, jsx_runtime_1.jsx)(material_1.TextField, __assign({}, fieldProps, { style: { width: "100%" }, multiline: true, minRows: 6 }))); } }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormFieldArray_1.default, { tKey: NAMESPACE_TRANSLATION_FORM, name: "other_approval_committees", addButtonLabel: tForm("add"), createNewRow: function () { return ""; }, renderField: function (_, index) { return ((0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { displayLabel: false, placeholder: tForm("otherApprovalCommitteesPlaceholder"), name: "other_approval_committees.".concat(index), renderField: function (fieldProps) { return (0, jsx_runtime_1.jsx)(material_1.TextField, __assign({}, fieldProps)); } })); } }) })] }), (0, jsx_runtime_1.jsx)(FormActions_1.default, { children: (0, jsx_runtime_1.jsx)(ProfileNavigationFooter_1.default, { isLoading: mutateState.isPending }) })] }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, md: 4, xs: 12, order: {
                        md: 2,
                        xs: 1,
                    }, children: (0, jsx_runtime_1.jsx)(material_1.Paper, { elevation: 0, sx: { backgroundColor: "neutralGrey.main", p: 3 }, children: (0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { fullWidth: true, name: "status", t: tForm, renderField: function (fieldProps) { return ((0, jsx_runtime_1.jsxs)(material_1.RadioGroup, __assign({ "aria-labelledby": "demo-radio-buttons-group-label", value: fieldProps.status, name: "status" }, fieldProps, { children: [(0, jsx_runtime_1.jsx)(material_1.FormControlLabel, { value: ChipStatus_1.Status.PROJECT_APPROVED, control: (0, jsx_runtime_1.jsx)(material_1.Radio, {}), label: (0, jsx_runtime_1.jsx)(ChipStatus_1.default, { status: ChipStatus_1.Status.PROJECT_APPROVED }) }), (0, jsx_runtime_1.jsx)(material_1.FormControlLabel, { value: ChipStatus_1.Status.PROJECT_PENDING, control: (0, jsx_runtime_1.jsx)(material_1.Radio, {}), label: (0, jsx_runtime_1.jsx)(ChipStatus_1.default, { status: ChipStatus_1.Status.PROJECT_PENDING }) }), (0, jsx_runtime_1.jsx)(material_1.FormControlLabel, { value: ChipStatus_1.Status.PROJECT_COMPLETED, control: (0, jsx_runtime_1.jsx)(material_1.Radio, {}), label: (0, jsx_runtime_1.jsx)(ChipStatus_1.default, { status: ChipStatus_1.Status.PROJECT_COMPLETED }) })] }))); } }) }) })] }) })));
}
