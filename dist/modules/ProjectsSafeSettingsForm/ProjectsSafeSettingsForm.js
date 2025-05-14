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
exports.default = ProjectSafeSettingsForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var Form_1 = __importDefault(require("@/components/Form"));
var FormActions_1 = __importDefault(require("@/components/FormActions"));
var FormControlWrapper_1 = __importDefault(require("@/components/FormControlWrapper"));
var ProfileNavigationFooter_1 = __importDefault(require("@/components/ProfileNavigationFooter"));
var yup_1 = __importDefault(require("@/config/yup"));
var projects_1 = require("@/consts/projects");
var store_1 = require("@/data/store");
var application_1 = require("@/utils/application");
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var react_1 = require("react");
var NAMESPACE_TRANSLATION_FORM = "Form.SafeSettings";
function ProjectSafeSettingsForm(_a) {
    var projectId = _a.projectId, mutateState = _a.mutateState, restProps = __rest(_a, ["projectId", "mutateState"]);
    var tForm = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_FORM);
    var routes = (0, store_1.useStore)(function (state) { return state.getApplication().routes; });
    var schema = (0, react_1.useMemo)(function () {
        return yup_1.default.object().shape({
            access_type: yup_1.default.string(),
            data_privacy: yup_1.default.string(),
        });
    }, []);
    var formOptions = {
        disabled: (mutateState === null || mutateState === void 0 ? void 0 : mutateState.isPending) || restProps.disabled,
        shouldResetKeep: true,
    };
    return ((0, jsx_runtime_1.jsxs)(Form_1.default, __assign({ schema: schema }, formOptions, restProps, { autoComplete: "off", children: [(0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, rowSpacing: 3, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { fullWidth: true, name: "access_type", t: tForm, renderField: function (fieldProps) { return ((0, jsx_runtime_1.jsxs)(material_1.RadioGroup, __assign({ value: fieldProps.access_type, name: "access_type" }, fieldProps, { children: [(0, jsx_runtime_1.jsx)(material_1.FormControlLabel, { value: projects_1.ProjectDetailsAccessType.TRE, control: (0, jsx_runtime_1.jsx)(material_1.Radio, {}), label: tForm("accessTypeSde"), disabled: fieldProps.disabled }), (0, jsx_runtime_1.jsx)(material_1.FormControlLabel, { value: projects_1.ProjectDetailsAccessType.RELEASE, control: (0, jsx_runtime_1.jsx)(material_1.Radio, {}), label: tForm("accessTypeDataRelease"), disabled: fieldProps.disabled })] }))); } }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { name: "data_privacy", t: tForm, renderField: function (fieldProps) { return ((0, jsx_runtime_1.jsx)(material_1.TextField, __assign({}, fieldProps, { multiline: true, style: { width: "100%" }, minRows: 6 }))); } }) })] }), projectId && ((0, jsx_runtime_1.jsx)(FormActions_1.default, { children: (0, jsx_runtime_1.jsx)(ProfileNavigationFooter_1.default, { previousHref: (0, application_1.injectParamsIntoPath)(routes.profileCustodianProjectsSafePeople.path, {
                        id: projectId,
                    }), isLoading: mutateState === null || mutateState === void 0 ? void 0 : mutateState.isPending }) }))] })));
}
