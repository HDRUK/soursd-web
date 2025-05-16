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
exports.default = InviteUserForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var Form_1 = __importDefault(require("../components/Form"));
var FormActions_1 = __importDefault(require("../components/FormActions"));
var FormControlHorizontal_1 = __importDefault(require("../components/FormControlHorizontal"));
var FormSection_1 = __importDefault(require("../components/FormSection"));
var yup_1 = __importDefault(require("../../config/yup"));
var form_1 = require("../../consts/form");
var Save_1 = __importDefault(require("@mui/icons-material/Save"));
var lab_1 = require("@mui/lab");
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var react_1 = require("react");
var NAMESPACE_TRANSLATION_FORM = "Form";
var NAMESPACE_TRANSLATION_ORGANISATION = "User";
function InviteUserForm(_a) {
    var onSubmit = _a.onSubmit, queryState = _a.queryState;
    var tForm = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_FORM);
    var tUser = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_ORGANISATION);
    var schema = (0, react_1.useMemo)(function () {
        return yup_1.default.object().shape({
            first_name: yup_1.default.string().required(tForm("firstNameRequiredInvalid")),
            last_name: yup_1.default.string().required(tForm("lastNameRequiredInvalid")),
            email: yup_1.default
                .string()
                .email(tForm("emailFormatInvalid"))
                .required(tForm("emailRequiredInvalid")),
        });
    }, [tForm]);
    var formOptions = {
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
        },
    };
    var formFields = ["first_name", "last_name", "email"];
    return ((0, jsx_runtime_1.jsx)(Form_1.default, __assign({ onSubmit: onSubmit, schema: schema }, formOptions, { sx: { mb: 3, maxWidth: form_1.MAX_FORM_WIDTH }, shouldReset: true, children: function () { return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(FormSection_1.default, { subtitle: tUser("inviteUserTitle"), children: (0, jsx_runtime_1.jsx)(material_1.Grid, { container: true, rowSpacing: 3, children: formFields.map(function (name) { return ((0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormControlHorizontal_1.default, { name: name, renderField: function (fieldProps) { return (0, jsx_runtime_1.jsx)(material_1.TextField, __assign({}, fieldProps)); } }) })); }) }) }), (0, jsx_runtime_1.jsx)(FormActions_1.default, { children: (0, jsx_runtime_1.jsx)(lab_1.LoadingButton, { type: "submit", endIcon: (0, jsx_runtime_1.jsx)(Save_1.default, {}), loading: queryState.isPending, sx: { display: "flex", justifySelf: "end" }, children: tForm("inviteButton") }) })] })); } })));
}
