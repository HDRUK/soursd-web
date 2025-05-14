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
exports.default = useFileUpload;
var files_1 = require("@/consts/files");
var getFileQuery_1 = __importDefault(require("@/services/files/getFileQuery"));
var postFileQuery_1 = __importDefault(require("@/services/files/postFileQuery"));
var file_1 = require("@/utils/file");
var react_query_1 = require("@tanstack/react-query");
var react_1 = require("react");
var useQueryAlerts_1 = __importDefault(require("../useQueryAlerts"));
var useQueryRefetch_1 = __importDefault(require("../useQueryRefetch"));
function useFileUpload(message, options) {
    var _this = this;
    var _a = (0, react_1.useState)(), file = _a[0], setFile = _a[1];
    var fileId = (file === null || file === void 0 ? void 0 : file.id) || (options === null || options === void 0 ? void 0 : options.initialFileId);
    var fileData = (0, react_query_1.useQuery)(__assign(__assign({}, (0, getFileQuery_1.default)(fileId)), { queryKey: ["getFile".concat(message)], enabled: !!fileId })).data;
    (0, react_1.useEffect)(function () {
        if (fileData === null || fileData === void 0 ? void 0 : fileData.data) {
            setFile(fileData === null || fileData === void 0 ? void 0 : fileData.data);
        }
    }, [fileData]);
    var _b = (0, useQueryRefetch_1.default)({
        options: { queryKey: ["getFile".concat(message)] },
    }), refetchFile = _b.refetch, refetchFileCancel = _b.cancel;
    var _c = (0, react_1.useState)(), isSizeInvalid = _c[0], setIsSizeInvalid = _c[1];
    var postFileState = (0, react_query_1.useMutation)((0, postFileQuery_1.default)(message));
    var _d = (0, react_1.useState)(false), isUploading = _d[0], setIsUploading = _d[1];
    (0, useQueryAlerts_1.default)(postFileState, {
        commonAlertProps: {
            willClose: function () {
                postFileState.reset();
            },
        },
    });
    var upload = (0, react_1.useCallback)(function (formData) { return __awaiter(_this, void 0, void 0, function () {
        var file, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsSizeInvalid(false);
                    setIsUploading(true);
                    file = formData.get("file");
                    if (!(file.size <= files_1.MAX_UPLOAD_SIZE_BYTES)) return [3 /*break*/, 2];
                    return [4 /*yield*/, postFileState.mutateAsync(formData)];
                case 1:
                    data = (_a.sent()).data;
                    setFile(data);
                    setIsUploading(false);
                    return [2 /*return*/, data];
                case 2:
                    setIsSizeInvalid(true);
                    setIsUploading(false);
                    return [2 /*return*/, null];
            }
        });
    }); }, [fileId, fileData]);
    (0, react_1.useEffect)(function () {
        var isScanning = (0, file_1.isFileScanning)(file);
        if ((file === null || file === void 0 ? void 0 : file.id) && (!file || isScanning)) {
            refetchFile();
        }
        else if (file) {
            refetchFileCancel();
        }
        return function () {
            refetchFileCancel();
        };
    }, [file === null || file === void 0 ? void 0 : file.id, file]);
    return {
        upload: upload,
        isScanning: (0, file_1.isFileScanning)(file),
        isScanComplete: (0, file_1.isFileScanComplete)(file),
        isScanFailed: (0, file_1.isFileScanFailed)(file),
        isSizeInvalid: isSizeInvalid,
        isUploading: isUploading,
        fileHref: (0, file_1.getFileHref)(file),
        file: file,
    };
}
