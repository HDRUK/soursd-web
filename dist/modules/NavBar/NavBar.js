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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonVariant = exports.ButtonColor = void 0;
exports.default = NavBar;
var react_1 = require("react");
var jsx_runtime_1 = require("react/jsx-runtime");
var HorizontalDrawer_1 = __importDefault(require("@/components/HorizontalDrawer"));
var MaskLabel_1 = __importDefault(require("@/components/MaskLabel"));
var SoursdLogo_1 = __importDefault(require("@/components/SoursdLogo"));
var store_1 = require("@/data/store");
var routing_1 = require("@/i18n/routing");
var NotificationsMenu_1 = __importDefault(require("@/modules/NotificationsMenu"));
var application_1 = require("@/utils/application");
var keycloak_1 = require("@/utils/keycloak");
var Menu_1 = __importDefault(require("@mui/icons-material/Menu"));
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var react_2 = require("react");
var contacts_1 = require("@/config/contacts");
var PageCenter_1 = __importDefault(require("../PageCenter"));
var NavBar_styles_1 = require("./NavBar.styles");
var NAMESPACE_TRANSLATIONS_NAVBAR = "NavBar";
var ButtonColor;
(function (ButtonColor) {
    ButtonColor["Primary"] = "primary";
    ButtonColor["Secondary"] = "secondary";
    ButtonColor["Inherit"] = "inherit";
})(ButtonColor || (exports.ButtonColor = ButtonColor = {}));
var ButtonVariant;
(function (ButtonVariant) {
    ButtonVariant["Contained"] = "contained";
    ButtonVariant["Text"] = "text";
    ButtonVariant["Outlined"] = "outlined";
})(ButtonVariant || (exports.ButtonVariant = ButtonVariant = {}));
function NavBar() {
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATIONS_NAVBAR);
    var storedUser = (0, store_1.useStore)(function (store) { return store.getUser(); });
    var theme = (0, material_1.useTheme)();
    var _a = (0, react_2.useState)(false), isDrawerOpen = _a[0], setIsDrawerOpen = _a[1];
    var isDesktop = (0, material_1.useMediaQuery)(theme.breakpoints.up("md"));
    (0, react_2.useEffect)(function () {
        if (isDesktop && isDrawerOpen) {
            setIsDrawerOpen(false);
        }
    }, [isDesktop, isDrawerOpen]);
    var left_buttons = [
        {
            color: ButtonColor.Inherit,
            variant: ButtonVariant.Text,
            text: storedUser ? t("myAccountButton") : t("homeButton"),
            href: "/",
        },
        {
            color: ButtonColor.Inherit,
            variant: ButtonVariant.Text,
            text: t("aboutButton"),
            href: "/about",
        },
        {
            color: ButtonColor.Inherit,
            variant: ButtonVariant.Text,
            text: t("featuresButton"),
            href: "/features",
        },
        {
            color: ButtonColor.Inherit,
            variant: ButtonVariant.Text,
            text: t("contactButton"),
            href: "mailto:".concat(contacts_1.CONTACT_MAIL_ADDRESS),
        },
        {
            color: ButtonColor.Inherit,
            variant: ButtonVariant.Text,
            text: t("helpButton"),
            href: "/support",
        },
    ];
    var right_buttons = __spreadArray([
        {
            color: ButtonColor.Primary,
            variant: ButtonVariant.Outlined,
            text: storedUser ? t("signOutButton") : t("signInButton"),
            onClick: function (e) {
                e.preventDefault();
                if (storedUser) {
                    (0, keycloak_1.handleLogout)();
                }
                else {
                    (0, keycloak_1.handleLogin)();
                }
            },
        }
    ], (storedUser
        ? []
        : [
            {
                color: ButtonColor.Primary,
                variant: ButtonVariant.Contained,
                text: t("registerButton"),
                onClick: function (e) {
                    e.preventDefault();
                    (0, keycloak_1.handleRegister)();
                },
            },
        ]), true);
    return ((0, jsx_runtime_1.jsxs)(NavBar_styles_1.StyledContainer, { children: [(0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                    display: {
                        xs: "none",
                        md: "block",
                    },
                }, "data-testid": "header-desktop-menu", children: (0, jsx_runtime_1.jsx)(PageCenter_1.default, { children: (0, jsx_runtime_1.jsxs)(NavBar_styles_1.StyledHeader, { children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: "flex", alignItems: "center", gap: 1 }, children: [(0, jsx_runtime_1.jsx)(SoursdLogo_1.default, { variant: "titled", sx: { mt: "-9px", mr: "40px" } }), left_buttons.map(function (_a) {
                                        var text = _a.text, icon = _a.icon, restProps = __rest(_a, ["text", "icon"]);
                                        return ((0, react_1.createElement)(material_1.Button, __assign({ component: routing_1.Link, sx: { minWidth: 0 } }, restProps, { key: text }), text || icon));
                                    })] }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: "flex", alignItems: "center", gap: 2 }, children: [right_buttons.map(function (_a) {
                                        var text = _a.text, icon = _a.icon, restProps = __rest(_a, ["text", "icon"]);
                                        return ((0, react_1.createElement)(material_1.Button, __assign({ component: routing_1.Link }, restProps, { key: text }), text || icon));
                                    }), storedUser && (0, jsx_runtime_1.jsx)(NotificationsMenu_1.default, {}), storedUser && ((0, jsx_runtime_1.jsx)(MaskLabel_1.default, { initials: "".concat((0, application_1.getInitials)("".concat(storedUser === null || storedUser === void 0 ? void 0 : storedUser.first_name, " ").concat(storedUser === null || storedUser === void 0 ? void 0 : storedUser.last_name))), label: "", size: "small" }))] })] }) }) }), (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: {
                    display: {
                        xs: "block",
                        md: "none",
                    },
                }, children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: "flex", minHeight: 46, alignItems: "center" }, children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(material_1.IconButton, { color: ButtonColor.Inherit, "aria-label": t("ariaOpenMobileMenu"), edge: "start", onClick: function () { return setIsDrawerOpen(!isDrawerOpen); }, sx: { mx: 0 }, children: (0, jsx_runtime_1.jsx)(Menu_1.default, {}) }) }), (0, jsx_runtime_1.jsx)(material_1.Box, { sx: { flexGrow: 1, justifyContent: "flex-end", display: "flex" }, children: (0, jsx_runtime_1.jsx)(SoursdLogo_1.default, { size: 40 }) })] }), (0, jsx_runtime_1.jsx)(HorizontalDrawer_1.default, { "data-testid": "header-mobile-menu", component: "nav", sx: {
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                minWidth: "200px",
                            },
                        }, open: isDrawerOpen, onClose: function () { return setIsDrawerOpen(false); }, dismissAriaLabel: t("ariaCloseMobileMenu"), isDismissable: true, children: (0, jsx_runtime_1.jsxs)(material_1.MenuList, { children: [left_buttons.map(function (_a) {
                                    var text = _a.text, restProps = __rest(_a, ["text"]);
                                    return ((0, jsx_runtime_1.jsx)(material_1.MenuItem, { sx: { "&:hover": { backgroundColor: "transparent" } }, children: (0, jsx_runtime_1.jsx)(material_1.Button, __assign({ component: routing_1.Link, fullWidth: true }, restProps, { children: text })) }, text));
                                }), right_buttons.map(function (_a) {
                                    var text = _a.text, restProps = __rest(_a, ["text"]);
                                    return ((0, jsx_runtime_1.jsx)(material_1.MenuItem, { sx: { "&:hover": { backgroundColor: "transparent" } }, children: (0, jsx_runtime_1.jsx)(material_1.Button, __assign({ component: routing_1.Link, fullWidth: true }, restProps, { children: text })) }, text));
                                }), storedUser && ((0, jsx_runtime_1.jsxs)(material_1.MenuItem, { sx: {
                                        "&:hover": { backgroundColor: "transparent" },
                                        justifyContent: "center",
                                    }, children: [(0, jsx_runtime_1.jsx)(NotificationsMenu_1.default, {}), " "] }, "Notifications"))] }) })] })] }));
}
