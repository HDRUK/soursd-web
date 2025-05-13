"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FileLink;
var jsx_runtime_1 = require("react/jsx-runtime");
var Text_1 = __importDefault(require("@/components/Text"));
var files_1 = require("@/consts/files");
var GppBad_1 = __importDefault(require("@mui/icons-material/GppBad"));
var GppGood_1 = __importDefault(require("@mui/icons-material/GppGood"));
var Upload_1 = __importDefault(require("@mui/icons-material/Upload"));
var lab_1 = require("@mui/lab");
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var pretty_bytes_1 = __importDefault(require("pretty-bytes"));
var react_1 = require("react");
var NAMESPACE_TRANSLATION_FILE = "File";
function FileLink(_a) {
    var accept = _a.accept, fileScanOkText = _a.fileScanOkText, fileScanErrorText = _a.fileScanErrorText, fileScanningText = _a.fileScanningText, fileButtonText = _a.fileButtonText, fileMaxSizeText = _a.fileMaxSizeText, fileMaxSizeErrorText = _a.fileMaxSizeErrorText, fileTypesText = _a.fileTypesText, fileNameText = _a.fileNameText, fileInputLabelText = _a.fileInputLabelText, isScanning = _a.isScanning, isScanComplete = _a.isScanComplete, isScanFailed = _a.isScanFailed, isUploading = _a.isUploading, isSizeInvalid = _a.isSizeInvalid, includeStatus = _a.includeStatus, onFileChange = _a.onFileChange, onDownload = _a.onDownload;
    var ref = (0, react_1.useRef)(null);
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_FILE);
    var translationsMaxSize = {
        size: (0, pretty_bytes_1.default)(files_1.MAX_UPLOAD_SIZE_BYTES),
    };
    var handleFileSelectorOpen = (0, react_1.useCallback)(function () {
        var _a;
        (_a = ref.current) === null || _a === void 0 ? void 0 : _a.click();
    }, []);
    var statusIcons = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [isScanComplete && ((0, jsx_runtime_1.jsx)(material_1.Tooltip, { title: fileScanOkText || t("scanOkText"), children: (0, jsx_runtime_1.jsx)(GppGood_1.default, { color: "success" }) })), isScanFailed && ((0, jsx_runtime_1.jsx)(material_1.Tooltip, { title: fileScanErrorText || t("scanErrorText"), children: (0, jsx_runtime_1.jsx)(GppBad_1.default, { color: "error" }) })), isScanning && ((0, jsx_runtime_1.jsx)(material_1.Tooltip, { title: fileScanningText || t("scanningText"), children: (0, jsx_runtime_1.jsx)(material_1.CircularProgress, { color: "info", size: "1em", role: "progressbar" }) }))] }));
    return ((0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, item: true, spacing: 0, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { container: true, item: true, children: (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 10, children: (0, jsx_runtime_1.jsx)(lab_1.LoadingButton, { color: "primary", variant: "outlined", "data-testid": "upload-file", onClick: handleFileSelectorOpen, startIcon: (0, jsx_runtime_1.jsx)(Upload_1.default, {}), loading: isUploading && !isScanning, children: fileButtonText }) }) }), (0, jsx_runtime_1.jsxs)(material_1.Grid, { item: true, xs: 12, children: [fileNameText && (
                    /* eslint-disable jsx-a11y/anchor-is-valid */
                    (0, jsx_runtime_1.jsx)(material_1.Link, { "data-testid": "download-file", variant: "body2", component: "button", onClick: function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            onDownload === null || onDownload === void 0 ? void 0 : onDownload(e);
                        }, disabled: !onDownload, children: includeStatus ? ((0, jsx_runtime_1.jsx)(Text_1.default, { endIcon: statusIcons, children: fileNameText })) : (fileNameText) })), (0, jsx_runtime_1.jsxs)(material_1.Typography, { variant: "caption", color: "caption.main", component: "div", children: [fileTypesText || t("fileTypesText"), ". ", fileMaxSizeText || t("maxSizeText", translationsMaxSize)] }), isSizeInvalid &&
                        (fileMaxSizeErrorText || t("maxSizeErrorText", translationsMaxSize))] }), (0, jsx_runtime_1.jsx)("input", { id: "fileInput", type: "file", "aria-label": fileInputLabelText || t("inputLabelText"), style: { display: "none" }, ref: ref, onChange: onFileChange, accept: accept })] }));
}
