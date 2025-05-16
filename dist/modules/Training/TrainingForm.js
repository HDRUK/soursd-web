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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TrainingForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_2 = require("react");
var react_hook_form_1 = require("react-hook-form");
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var Form_1 = __importDefault(require("../components/Form"));
var FormControlWrapper_1 = __importDefault(require("../components/FormControlWrapper"));
var FormActions_1 = __importDefault(require("../components/FormActions"));
var ButtonSave_1 = __importDefault(require("../components/ButtonSave"));
var DateInput_1 = __importDefault(require("../components/DateInput"));
var files_1 = require("../../consts/files");
var yup_1 = __importDefault(require("../../config/yup"));
var dayjs_1 = __importDefault(require("dayjs"));
var date_1 = require("../../utils/date");
var useFileUpload_1 = __importDefault(require("../../hooks/useFileUpload"));
var useUserFileUpload_1 = __importDefault(require("../../hooks/useUserFileUpload"));
var store_1 = require("@/data/store");
var FileUploadDetails_1 = __importDefault(require("../FileUploadDetails/FileUploadDetails"));
var NAMESPACE_TRANSLATION_FORM = "Form.Training";
var NAMESPACE_TRANSLATION_FILE_UPLOAD = "Certification";
function TrainingForm(_a) {
    var _this = this;
    var onSubmit = _a.onSubmit, isPending = _a.isPending, onCancel = _a.onCancel, initialValues = _a.initialValues;
    var tForm = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_FORM);
    var tUpload = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_FILE_UPLOAD);
    var _b = (0, store_1.useStore)(function (store) { return [store.config.user, store.setUser]; }), user = _b[0], setUser = _b[1];
    var calculateYearsRemaining = function (expirationDate) {
        var now = (0, dayjs_1.default)();
        var expiration = (0, dayjs_1.default)(expirationDate);
        if (!expiration.isValid() || expiration.isBefore(now)) {
            return 0;
        }
        return expiration.diff(now, "year", true);
    };
    var _c = (0, useFileUpload_1.default)("certificationUploadFailed", {
        initialFileId: initialValues === null || initialValues === void 0 ? void 0 : initialValues.certification_id,
    }), upload = _c.upload, isScanComplete = _c.isScanComplete, isScanFailed = _c.isScanFailed, isSizeInvalid = _c.isSizeInvalid, isUploading = _c.isUploading, isScanning = _c.isScanning, file = _c.file;
    var setValue = (0, react_hook_form_1.useForm)().setValue;
    (0, react_2.useEffect)(function () {
        if (file) {
            setValue("certification_upload", file);
        }
    }, [file, setValue]);
    var uploadFile = (0, useUserFileUpload_1.default)({
        user: user,
        fileType: files_1.FileType.CERTIFICATION,
        upload: upload,
    });
    var handleFileUpload = (0, react_2.useCallback)(function (e) { return __awaiter(_this, void 0, void 0, function () {
        var updatedUser, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, uploadFile(e)];
                case 1:
                    updatedUser = _a.sent();
                    if (updatedUser) {
                        setUser(updatedUser);
                        setValue("certification_upload", file);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("File upload failed:", error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }, [user === null || user === void 0 ? void 0 : user.registry_id, uploadFile, setUser, setValue, file]);
    var schema = (0, react_2.useMemo)(function () {
        return yup_1.default.object().shape({
            provider: yup_1.default
                .string()
                .required(tForm("trainingProviderRequiredInvalid")),
            training_name: yup_1.default
                .string()
                .required(tForm("trainingNameRequiredInvalid")),
            awarded_at: yup_1.default
                .string()
                .required(tForm("awardedAtRequiredInvalid"))
                .test("not-future", tForm("awardedAtFutureInvalid"), function (value) {
                return ((0, dayjs_1.default)(value).isBefore((0, dayjs_1.default)()) ||
                    (0, dayjs_1.default)(value).isSame((0, dayjs_1.default)(), "day"));
            }),
            expires_at: yup_1.default
                .string()
                .required(tForm("expiresAtRequiredInvalid"))
                .test("after-awarded", tForm("expiresAtBeforeAwardedAtInvalid"), function (value, context) {
                var awarded_at = context.parent.awarded_at;
                return (0, dayjs_1.default)(value).isAfter((0, dayjs_1.default)(awarded_at));
            })
                .test("is-future", tForm("expiresAtPastInvalid"), function (value) {
                return (0, dayjs_1.default)(value).isAfter((0, dayjs_1.default)());
            }),
            certification_upload: yup_1.default.mixed(),
        });
    }, [tForm]);
    var formOptions = {
        defaultValues: {
            provider: (initialValues === null || initialValues === void 0 ? void 0 : initialValues.provider) || "",
            training_name: (initialValues === null || initialValues === void 0 ? void 0 : initialValues.training_name) || "",
            awarded_at: (initialValues === null || initialValues === void 0 ? void 0 : initialValues.awarded_at) || "",
            expires_at: (initialValues === null || initialValues === void 0 ? void 0 : initialValues.expires_at) || "",
        },
    };
    var handleSubmit = function (fields) {
        var _a;
        var yearsRemaining = calculateYearsRemaining(fields.expires_at);
        var formattedFields = __assign(__assign({}, fields), { awarded_at: (0, date_1.formatDBDate)(fields.awarded_at), expires_at: (0, date_1.formatDBDate)(fields.expires_at), expires_in_years: yearsRemaining, certification_id: (_a = file === null || file === void 0 ? void 0 : file.id) !== null && _a !== void 0 ? _a : null });
        onSubmit(formattedFields);
    };
    return ((0, react_1.createElement)(Form_1.default, __assign({ onSubmit: handleSubmit, schema: schema }, formOptions, { key: user === null || user === void 0 ? void 0 : user.id }),
        (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, rowSpacing: 3, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { name: "provider", label: tForm("provider"), renderField: function (props) { return (0, jsx_runtime_1.jsx)(material_1.TextField, __assign({}, props)); } }) }, "provider"), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { name: "training_name", label: tForm("trainingName"), renderField: function (props) { return (0, jsx_runtime_1.jsx)(material_1.TextField, __assign({}, props)); } }) }, "training_name"), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 7, children: (0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { name: "awarded_at", label: tForm("awardedAt"), renderField: function (props) { return (0, jsx_runtime_1.jsx)(DateInput_1.default, __assign({}, props)); } }) }, "awarded_at"), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 7, children: (0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { name: "expires_at", label: tForm("expiresAt"), renderField: function (props) { return (0, jsx_runtime_1.jsx)(DateInput_1.default, __assign({}, props)); } }) }, "expires_at"), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(FormControlWrapper_1.default, { name: "certification_upload", label: tForm("certificationUpload"), renderField: function () { return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "body2", gutterBottom: true, children: tForm("uploadInstructions") }), (0, jsx_runtime_1.jsx)(material_1.Divider, { sx: { mb: 2, backgroundColor: "grey" } }), (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "subtitle1", gutterBottom: true, children: tForm("fileUpload") }), (0, jsx_runtime_1.jsx)(FileUploadDetails_1.default, { fileButtonText: tForm("uploadCertification"), fileType: files_1.FileType.CERTIFICATION, fileTypesText: tUpload("fileTypesText"), fileNameText: (file === null || file === void 0 ? void 0 : file.name) || tForm("noCertificationUploaded"), isSizeInvalid: isSizeInvalid, isScanning: isScanning, isScanComplete: isScanComplete, isScanFailed: isScanFailed, isUploading: isUploading, onFileChange: handleFileUpload, message: "certificationUploadFailed" }), !file && ((0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "body2", sx: { mt: 2, color: "text.secondary" }, children: tUpload("noFilesUploaded") }))] })); } }) }, "certification_upload")] }),
        (0, jsx_runtime_1.jsxs)(FormActions_1.default, { sx: { display: "flex", justifyContent: "space-between" }, children: [(0, jsx_runtime_1.jsx)(material_1.Button, { onClick: onCancel, variant: "outlined", children: tForm("cancel") }), (0, jsx_runtime_1.jsx)(ButtonSave_1.default, { type: "submit", disabled: isPending })] })));
}
