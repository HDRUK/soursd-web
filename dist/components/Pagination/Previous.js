"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var icons_material_1 = require("@mui/icons-material");
var next_intl_1 = require("next-intl");
var Text_1 = __importDefault(require("../Text"));
var NAMESPACE_TRANSLATIONS = "Pagination";
var Previous = function () {
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATIONS);
    return (0, jsx_runtime_1.jsx)(Text_1.default, { startIcon: (0, jsx_runtime_1.jsx)(icons_material_1.ArrowLeft, {}), children: t("previousButtonLabel") });
};
exports.default = Previous;
