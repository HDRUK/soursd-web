"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserTrainingAccreditations;
var jsx_runtime_1 = require("react/jsx-runtime");
var next_intl_1 = require("next-intl");
var Training_1 = __importDefault(require("@/modules/Training"));
var PageSection_1 = __importDefault(require("@/modules/PageSection"));
var PageBodyContainer_1 = __importDefault(require("@/modules/PageBodyContainer"));
var material_1 = require("@mui/material");
var ProfessionalRegistrations_1 = __importDefault(require("@/modules/ProfessionalRegistrations"));
var store_1 = require("@/data/store");
var NAMESPACE_TRANSLATION = "Application";
function UserTrainingAccreditations(_a) {
    var variant = _a.variant;
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION);
    var _b = (0, store_1.useStore)(function (state) {
        var _a;
        return ({
            user: state.current.user,
            setHistories: state.setHistories,
            getHistories: state.getHistories,
            professionalRegistrations: ((_a = state.config.histories) === null || _a === void 0 ? void 0 : _a.professionalRegistrations) || [],
        });
    }), user = _b.user, setHistories = _b.setHistories, getHistories = _b.getHistories, professionalRegistrations = _b.professionalRegistrations;
    return ((0, jsx_runtime_1.jsxs)(PageBodyContainer_1.default, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h2", children: t("trainingAndAccreditations") }), (0, jsx_runtime_1.jsx)(PageSection_1.default, { sx: { my: 3 }, children: (0, jsx_runtime_1.jsx)(Training_1.default, { variant: variant, user: user }) }), (0, jsx_runtime_1.jsx)(PageSection_1.default, { sx: { mb: 3 }, children: (0, jsx_runtime_1.jsx)(ProfessionalRegistrations_1.default, { variant: variant, user: user, setHistories: setHistories, getHistories: getHistories, professionalRegistrations: professionalRegistrations }) })] }));
}
