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
exports.default = ProjectsSafeDataForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var DateInput_1 = __importDefault(require("@/components/DateInput"));
var Form_1 = __importDefault(require("@/components/Form"));
var FormActions_1 = __importDefault(require("@/components/FormActions"));
var FormControlCheckbox_1 = __importDefault(require("@/components/FormControlCheckbox"));
var FormControlHorizontal_1 = __importDefault(require("@/components/FormControlHorizontal"));
var FormControlWrapper_1 = __importDefault(require("@/components/FormControlWrapper"));
var FormFieldArray_1 = __importDefault(require("@/components/FormFieldArray"));
var ProfileNavigationFooter_1 = __importDefault(require("@/components/ProfileNavigationFooter"));
var yup_1 = __importDefault(require("@/config/yup"));
var projects_1 = require("@/consts/projects");
var store_1 = require("@/data/store");
var application_1 = require("@/utils/application");
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var react_1 = require("react");
var NAMESPACE_TRANSLATION = "Form.SafeData";
function ProjectsSafeDataForm(_a) {
    var projectId = _a.projectId, mutateState = _a.mutateState, restProps = __rest(_a, ["projectId", "mutateState"]);
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION);
    var routes = (0, store_1.useStore)(function (state) { return state.getApplication().routes; });
    var formOptions = {
        disabled: (mutateState === null || mutateState === void 0 ? void 0 : mutateState.isPending) || restProps.disabled,
        shouldResetKeep: true,
    };
    var schema = (0, react_1.useMemo)(function () {
        return yup_1.default.object().shape({
            datasets: yup_1.default.array().of(yup_1.default.string()),
            data_sensitivity_level: yup_1.default.string(),
            legal_basis_for_data_article6: yup_1.default
                .string()
                .required(t("lawfulConditionRequired")),
            duty_of_confidentiality: yup_1.default.boolean(),
            national_data_optout: yup_1.default.boolean(),
            request_frequency: yup_1.default.string(),
            dataset_linkage_description: yup_1.default.string(),
            data_minimisation: yup_1.default.string(),
            data_use_description: yup_1.default.string(),
            access_date: yup_1.default.string(),
        });
    }, [t]);
    return ((0, jsx_runtime_1.jsxs)(Form_1.default, __assign({ schema: schema }, formOptions, restProps, { children: [(0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, spacing: 3, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormFieldArray_1.default, { name: "datasets", initialRowCount: 1, minimumRows: 1, createNewRow: function () { return ""; }, tKey: NAMESPACE_TRANSLATION, renderField: function (_, index) { return ((0, jsx_runtime_1.jsx)(FormControlHorizontal_1.default, { displayLabel: false, labelMd: 0, contentMd: 12, name: "datasets.".concat(index), placeholder: t("datasetsPlaceholder"), renderField: function (fieldProps) { return ((0, jsx_runtime_1.jsx)(material_1.TextField, __assign({}, fieldProps, { fullWidth: true }))); } })); } }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { name: "data_sensitivity_level", t: t, sx: { maxWidth: "33%" }, renderField: function (props) { return ((0, jsx_runtime_1.jsxs)(material_1.Select, __assign({}, props, { fullWidth: true, children: [(0, jsx_runtime_1.jsx)(material_1.MenuItem, { value: "De-Personalised", children: t("dePersonalised") }), (0, jsx_runtime_1.jsx)(material_1.MenuItem, { value: "Personally Identifiable", children: t("personallyIdentifiable") }), (0, jsx_runtime_1.jsx)(material_1.MenuItem, { value: "Anonymous", children: t("anonymous") })] }))); } }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { name: "legal_basis_for_data_article6", t: t, label: t.rich("legalBasisForDataArticle6", {
                                link: function (chunks) { return ((0, jsx_runtime_1.jsx)(material_1.Link, { href: "https://gdpr-info.eu/art-6-gdpr/", target: "_blank", children: chunks })); },
                            }), sx: { maxWidth: "50%" }, renderField: function (props) { return (0, jsx_runtime_1.jsx)(material_1.TextField, __assign({}, props, { fullWidth: true })); } }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormControlCheckbox_1.default, { name: "duty_of_confidentiality", t: t, label: t.rich("lawfulBasisConfirmation", {
                                link: function (chunks) { return ((0, jsx_runtime_1.jsx)(material_1.Link, { href: "https://www.gov.uk/government/publications/accessing-ukhsa-protected-data/approval-standards-and-guidelines-confidential-patient-information", target: "_blank", children: chunks })); },
                            }) }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormControlCheckbox_1.default, { name: "national_data_optout", label: t("nationalDataOptOut") }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { name: "request_frequency", t: t, placeholder: "", renderField: function (props) { return ((0, jsx_runtime_1.jsxs)(material_1.RadioGroup, __assign({}, props, { row: true, children: [(0, jsx_runtime_1.jsx)(material_1.FormControlLabel, { value: projects_1.RequestFrequency.ONE_OFF, control: (0, jsx_runtime_1.jsx)(material_1.Radio, {}), label: t("oneOffRequest"), disabled: props.disabled }), (0, jsx_runtime_1.jsx)(material_1.FormControlLabel, { value: projects_1.RequestFrequency.RECURRING, control: (0, jsx_runtime_1.jsx)(material_1.Radio, {}), label: t("recurringDataset"), disabled: props.disabled })] }))); } }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { name: "dataset_linkage_description", t: t, sx: { maxWidth: "50%" }, renderField: function (props) { return ((0, jsx_runtime_1.jsx)(material_1.TextField, __assign({}, props, { fullWidth: true, multiline: true, rows: 4 }))); } }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { name: "data_minimisation", t: t, sx: { maxWidth: "50%" }, renderField: function (props) { return ((0, jsx_runtime_1.jsx)(material_1.TextField, __assign({}, props, { fullWidth: true, multiline: true, rows: 4 }))); } }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { name: "data_use_description", t: t, sx: { maxWidth: "50%" }, renderField: function (props) { return ((0, jsx_runtime_1.jsx)(material_1.TextField, __assign({}, props, { fullWidth: true, multiline: true, rows: 4 }))); } }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { name: "access_date", label: t("releaseDate"), description: t("releaseDateDescription"), placeholder: "", sx: { maxWidth: "40%" }, renderField: function (props) { return (0, jsx_runtime_1.jsx)(DateInput_1.default, __assign({}, props)); } }) })] }), projectId && ((0, jsx_runtime_1.jsx)(FormActions_1.default, { children: (0, jsx_runtime_1.jsx)(ProfileNavigationFooter_1.default, { previousHref: (0, application_1.injectParamsIntoPath)(routes.profileCustodianProjectsSafeProject.path, {
                        id: projectId,
                    }), isLoading: mutateState === null || mutateState === void 0 ? void 0 : mutateState.isPending }) }))] })));
}
