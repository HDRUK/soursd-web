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
exports.default = FileUploadDetails;
var jsx_runtime_1 = require("react/jsx-runtime");
var FileLink_1 = __importDefault(require("../components/FileLink"));
var files_1 = require("../../consts/files");
var next_intl_1 = require("next-intl");
function FileUploadDetails(_a) {
    var _b = _a.fileType, fileType = _b === void 0 ? files_1.FileType.CV : _b, fileLinkProps = __rest(_a, ["fileType"]);
    var t = (0, next_intl_1.useTranslations)(fileType === files_1.FileType.CV ? "Cv" : "Certification");
    return ((0, jsx_runtime_1.jsx)(FileLink_1.default, __assign({}, fileLinkProps, { fileButtonText: t("fileUpload"), fileInputLabelText: t("fileInputLabel"), fileScanErrorText: t("fileScanError"), fileScanningText: t("fileScanning"), fileScanOkText: t("fileScanOk"), includeStatus: true })));
}
