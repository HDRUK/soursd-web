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
exports.default = Footer;
var jsx_runtime_1 = require("react/jsx-runtime");
var SoursdLogo_1 = __importDefault(require("@/components/SoursdLogo"));
var UL_1 = __importDefault(require("@/components/UL"));
var routing_1 = require("@/i18n/routing");
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var image_1 = __importDefault(require("next/image"));
var contacts_1 = require("@/config/contacts");
var PageCenter_1 = __importDefault(require("../PageCenter"));
var Footer_styles_1 = require("./Footer.styles");
var NAMESPACE_TRANSLATIONS_FOOTER = "Footer";
function Footer(props) {
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATIONS_FOOTER);
    var footerLinkPages = [
        {
            href: "/about",
            label: t("aboutUsLink"),
        },
        {
            href: "mailto:".concat(contacts_1.CONTACT_MAIL_ADDRESS),
            label: t("contactUsLink"),
        },
        {
            href: "/privacy-policy",
            label: t("privacyLink"),
        },
        {
            href: "/cookie-policy",
            label: t("cookieLink"),
        },
    ];
    return ((0, jsx_runtime_1.jsx)(material_1.Box, __assign({}, props, { component: "footer", sx: { backgroundColor: "footer.main" }, children: (0, jsx_runtime_1.jsx)(PageCenter_1.default, { children: (0, jsx_runtime_1.jsxs)(Footer_styles_1.StyledFooter, { children: [(0, jsx_runtime_1.jsx)(SoursdLogo_1.default, { variant: "titled", color: "white" }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { flexGrow: 1, fontSize: "medium" }, children: [(0, jsx_runtime_1.jsx)(UL_1.default, { sx: {
                                    mb: 1,
                                }, responsiveProps: {
                                    variant: {
                                        md: "horizontal",
                                        sm: "vertical",
                                    },
                                }, children: footerLinkPages.map(function (_a) {
                                    var label = _a.label, linkProps = __rest(_a, ["label"]);
                                    return ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(material_1.Box, __assign({ component: routing_1.Link, sx: {
                                                color: "#fff",
                                                textDecoration: "none",
                                                fontWeight: "bold",
                                                fontSize: "medium",
                                            } }, linkProps, { children: label })) }, label));
                                }) }), t("copyright")] }), (0, jsx_runtime_1.jsxs)(material_1.Box, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { color: "white", sx: { fontWeight: "bold" }, children: t("fundedByTitle") }), (0, jsx_runtime_1.jsxs)(Footer_styles_1.StyledBox, { children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: "/images/logos/mrc.svg", width: 207, height: 64, alt: t("mrcLogoAlt") }), (0, jsx_runtime_1.jsx)(material_1.Box, { sx: { mb: "-21px" }, children: (0, jsx_runtime_1.jsx)(image_1.default, { src: "/images/logos/dsit.svg", width: 228, height: 122, alt: t("dsitLogoAlt") }) })] })] })] }) }) })));
}
