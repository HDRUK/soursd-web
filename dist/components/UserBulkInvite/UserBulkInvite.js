"use strict";
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
exports.default = UserBulkInvite;
var jsx_runtime_1 = require("react/jsx-runtime");
var FileLink_1 = __importDefault(require("../FileLink"));
var files_1 = require("../../consts/files");
var useFileUpload_1 = __importDefault(require("../../hooks/useFileUpload"));
var file_1 = require("../../utils/file");
var material_1 = require("@mui/material");
var react_1 = require("react");
function UserBulkInvite(_a) {
    var _this = this;
    var organisation_id = _a.organisation_id;
    var _b = (0, useFileUpload_1.default)("bulkInviteUploadError"), upload = _b.upload, isScanComplete = _b.isScanComplete, isScanFailed = _b.isScanFailed, isScanning = _b.isScanning, isSizeInvalid = _b.isSizeInvalid, isUploading = _b.isUploading;
    var handleFileChange = (0, react_1.useCallback)(function (e) { return __awaiter(_this, void 0, void 0, function () {
        var file, formData;
        return __generator(this, function (_a) {
            file = (0, file_1.getFileFromEvent)(e);
            if (file) {
                formData = new FormData();
                formData.append("file", file);
                formData.append("file_type", files_1.FileType.RESEARCHER_LIST);
                formData.append("organisation_id", "".concat(organisation_id));
                upload(formData);
            }
            return [2 /*return*/];
        });
    }); }, []);
    return ((0, jsx_runtime_1.jsx)(material_1.Box, { children: (0, jsx_runtime_1.jsx)(material_1.Box, { sx: { minWidth: "210px", maxWidth: "210px" }, children: (0, jsx_runtime_1.jsx)(FileLink_1.default, { accept: ".csv", includeStatus: false, fileButtonText: "Bulk upload users", isSizeInvalid: isSizeInvalid, isScanning: isScanning, isScanComplete: isScanComplete, isScanFailed: isScanFailed, isUploading: isUploading, onFileChange: handleFileChange }) }) }));
}
