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
exports.default = TermsAndConditionsModal;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var material_1 = require("@mui/material");
var Markdown_1 = __importDefault(require("@/components/Markdown"));
var FormModal_1 = __importDefault(require("@/components/FormModal"));
var next_intl_1 = require("next-intl");
var index_1 = require("@/mocks/data/terms_and_conditions/index");
var description_md_1 = __importDefault(require("@/mocks/data/terms_and_conditions/description.md"));
var TermsAndConditionsModal_styles_1 = require("./TermsAndConditionsModal.styles");
var NAMESPACE_TRANSLATION_TERMS = "TermsAndConditions";
function TermsAndConditionsModal(_a) {
    var accountType = _a.accountType, onAccept = _a.onAccept, onDecline = _a.onDecline, restProps = __rest(_a, ["accountType", "onAccept", "onDecline"]);
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_TERMS);
    var _b = (0, react_1.useState)("understanding"), selectedItem = _b[0], setSelectedItem = _b[1];
    var handleListItemClick = function (item) {
        setSelectedItem(item);
    };
    var mockedTermsAndConditions = accountType === "user"
        ? index_1.mockedTermsAndConditionsConsumer
        : index_1.mockedTermsAndConditionsBusiness;
    var renderContent = function () {
        var item = mockedTermsAndConditions[selectedItem];
        if (!item || !item.content) {
            return null;
        }
        return item.content;
    };
    var termsItems = Object.keys(mockedTermsAndConditions);
    if (accountType === null)
        return ((0, jsx_runtime_1.jsx)(FormModal_1.default, __assign({}, restProps, { variant: "content", children: t("pleaseSelect") })));
    return ((0, jsx_runtime_1.jsxs)(FormModal_1.default, __assign({}, restProps, { variant: "content", children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                    display: "flex",
                    height: "60vh",
                    borderBottom: 1,
                    borderColor: "divider",
                    pb: 1,
                }, children: [(0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                            width: "35%",
                            borderRight: 1,
                            borderColor: "divider",
                            overflowY: "scroll",
                        }, children: (0, jsx_runtime_1.jsx)(material_1.List, { component: "nav", sx: { py: 0 }, children: termsItems.map(function (item, index) { return ((0, jsx_runtime_1.jsxs)(TermsAndConditionsModal_styles_1.StyledListItemButton, { selected: selectedItem === item, onClick: function () { return handleListItemClick(item); }, children: [(0, jsx_runtime_1.jsx)(TermsAndConditionsModal_styles_1.StyledRadio, { checked: selectedItem === item, onChange: function () { return handleListItemClick(item); } }), (0, jsx_runtime_1.jsx)(TermsAndConditionsModal_styles_1.StyledListItemText, { primary: "".concat(index + 1, ". ").concat(t(item)), isSelected: selectedItem === item })] }, item)); }) }) }), (0, jsx_runtime_1.jsx)(material_1.Box, { sx: { width: "65%", p: 3, overflowY: "auto" }, children: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h4", gutterBottom: true, children: t("title") }), (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "body1", paragraph: true, sx: { borderBottom: 1, borderColor: "divider", pb: 1 }, children: (0, jsx_runtime_1.jsx)(Markdown_1.default, { children: description_md_1.default }) }), renderContent()] }) })] }), (0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    mt: 2,
                    px: 3,
                    pb: 2,
                }, children: (0, jsx_runtime_1.jsxs)(material_1.Box, { children: [(0, jsx_runtime_1.jsx)(material_1.Button, { variant: "outlined", onClick: onDecline, sx: { mr: 1 }, children: t("decline") }), (0, jsx_runtime_1.jsx)(material_1.Button, { variant: "contained", color: "primary", onClick: onAccept, children: t("accept") })] }) })] })));
}
