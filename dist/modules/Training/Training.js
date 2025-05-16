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
exports.default = Training;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var react_query_1 = require("@tanstack/react-query");
var next_intl_1 = require("next-intl");
var react_1 = require("react");
var server_1 = __importDefault(require("react-dom/server"));
var FormModal_1 = __importDefault(require("../components/FormModal"));
var ContactLink_1 = __importDefault(require("../components/ContactLink"));
var Table_1 = __importDefault(require("../components/Table"));
var date_1 = require("../../utils/date");
var useQueryAlerts_1 = __importDefault(require("../../hooks/useQueryAlerts"));
var ActionMenu_1 = require("../components/ActionMenu");
var TaskAlt_1 = __importDefault(require("@mui/icons-material/TaskAlt"));
var useFileDownload_1 = __importDefault(require("../../hooks/useFileDownload"));
var showAlert_1 = require("../../utils/showAlert");
var trainings_1 = require("../../services/trainings");
var api_1 = require("@/types/api");
var DeleteOutlineOutlined_1 = __importDefault(require("@mui/icons-material/DeleteOutlineOutlined"));
var useQueryConfirmAlerts_1 = __importDefault(require("../../hooks/useQueryConfirmAlerts"));
var CreateOutlined_1 = __importDefault(require("@mui/icons-material/CreateOutlined"));
var icons_1 = require("../../consts/icons");
var TrainingForm_1 = __importDefault(require("./TrainingForm"));
var NAMESPACE_TRANSLATION_TRAINING = "Training";
var NAMESPACE_TRANSLATION_APPLICATION = "Application";
var NAMESPACE_TRANSLATION_PROFILE = "Profile";
function Training(_a) {
    var _this = this;
    var variant = _a.variant, user = _a.user, setHistories = _a.setHistories, getHistories = _a.getHistories;
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_TRAINING);
    var tApplication = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_APPLICATION);
    var tProfile = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_PROFILE);
    var _b = (0, react_1.useState)(false), isModalOpen = _b[0], setIsModalOpen = _b[1];
    var _c = (0, react_1.useState)(undefined), selectedTraining = _c[0], setSelectedTraining = _c[1];
    var _d = (0, react_1.useState)(), fileIdToDownload = _d[0], setFileIdToDownload = _d[1];
    var fileDownload = (0, useFileDownload_1.default)(fileIdToDownload).downloadFile;
    var downloadFile = (0, react_1.useCallback)(function (fileId) {
        setFileIdToDownload(fileId);
    }, []);
    var handleDelete = function (id) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            showDeleteConfirm(id);
            return [2 /*return*/];
        });
    }); };
    var _e = (0, react_query_1.useMutation)((0, trainings_1.putTrainingsQuery)(selectedTraining === null || selectedTraining === void 0 ? void 0 : selectedTraining.id)), mutateUpdateAsync = _e.mutateAsync, putTrainingsQueryState = __rest(_e, ["mutateAsync"]);
    var _f = (0, react_query_1.useQuery)(__assign(__assign({}, (0, trainings_1.getTrainingByRegistryIdQuery)(user === null || user === void 0 ? void 0 : user.registry_id)), { enabled: !!(user === null || user === void 0 ? void 0 : user.registry_id) })), trainingsData = _f.data, refetchTrainings = _f.refetch, trainingDataQueryState = __rest(_f, ["data", "refetch"]);
    var _g = (0, react_query_1.useMutation)((0, trainings_1.postTrainingsQuery)(user === null || user === void 0 ? void 0 : user.registry_id)), mutateAsync = _g.mutateAsync, isPending = _g.isPending, postTrainingsQueryState = __rest(_g, ["mutateAsync", "isPending"]);
    var _h = (0, react_query_1.useMutation)((0, trainings_1.deleteTrainingsQuery)()), mutateDeleteAsync = _h.mutateAsync, deleteProfessionalRegistrationQueryState = __rest(_h, ["mutateAsync"]);
    (0, react_1.useEffect)(function () {
        try {
            if (fileIdToDownload) {
                fileDownload();
                setFileIdToDownload(undefined);
            }
        }
        catch (_) {
            (0, showAlert_1.showAlert)("error", {
                text: server_1.default.renderToString(t.rich("fileDownloadError", {
                    contactLink: ContactLink_1.default,
                })),
                confirmButtonText: t("errorButton"),
            });
        }
    }, [fileIdToDownload, fileDownload]);
    var handleOpenModal = (0, react_1.useCallback)(function (training) {
        setSelectedTraining(training);
        setIsModalOpen(true);
    }, []);
    var handleAddTraining = (0, react_1.useCallback)(function () {
        handleOpenModal();
    }, [handleOpenModal]);
    var handleCloseModal = function () {
        setIsModalOpen(false);
        setSelectedTraining(undefined);
    };
    (0, useQueryAlerts_1.default)(selectedTraining ? putTrainingsQueryState : postTrainingsQueryState, {
        commonAlertProps: {
            willClose: function () {
                handleCloseModal();
            },
        },
        errorAlertProps: {
            text: selectedTraining
                ? server_1.default.renderToString(t.rich("updateTrainingError", {
                    contactLink: ContactLink_1.default,
                }))
                : server_1.default.renderToString(t.rich("postTrainingError", {
                    contactLink: ContactLink_1.default,
                })),
        },
        successAlertProps: {
            text: selectedTraining
                ? t("updateTrainingSuccess")
                : t("postTrainingSuccess"),
        },
    });
    var showDeleteConfirm = (0, useQueryConfirmAlerts_1.default)(deleteProfessionalRegistrationQueryState, {
        confirmAlertProps: {
            preConfirm: function (id) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, mutateDeleteAsync(id)];
                        case 1:
                            _a.sent();
                            refetchTrainings();
                            return [2 /*return*/];
                    }
                });
            }); },
        },
        errorAlertProps: {
            text: server_1.default.renderToString(t.rich("errorDeleteMessage", {
                contactLink: ContactLink_1.default,
            })),
        },
        successAlertProps: {
            text: t("successDeleteMessage"),
        },
    });
    var renderActions = (0, react_1.useCallback)(function (training) {
        var certificateFileId = training.certification_id;
        return ((0, jsx_runtime_1.jsxs)(ActionMenu_1.ActionMenu, { "aria-label": "Actions for ".concat(training.training_name), children: [(0, jsx_runtime_1.jsx)(ActionMenu_1.ActionMenuItem, { onClick: function () { return handleOpenModal(training); }, sx: { color: "menuList1.main" }, icon: (0, jsx_runtime_1.jsx)(CreateOutlined_1.default, { sx: { color: "menuList1.main" } }), children: tProfile("viewOrEdit") }), (0, jsx_runtime_1.jsx)(ActionMenu_1.ActionMenuItem, { icon: (0, jsx_runtime_1.jsx)(TaskAlt_1.default, { sx: { color: "menuList1.main" } }), sx: { color: "menuList1.main" }, onClick: function () {
                        return !!certificateFileId && downloadFile(certificateFileId);
                    }, disabled: !certificateFileId, children: t("viewCertificate") }), (0, jsx_runtime_1.jsx)(ActionMenu_1.ActionMenuItem, { onClick: function () {
                        handleDelete(training.id);
                    }, sx: { color: "error.main" }, icon: (0, jsx_runtime_1.jsx)(DeleteOutlineOutlined_1.default, { sx: { color: "error.main" } }), children: tApplication("delete") })] }));
    }, [user, downloadFile, handleDelete, t, tProfile, tApplication]);
    var onSubmit = (0, react_1.useCallback)(function (training) { return __awaiter(_this, void 0, void 0, function () {
        var histories, updatedHistories;
        return __generator(this, function (_a) {
            try {
                histories = getHistories();
                updatedHistories = __assign(__assign({}, histories), { training: __spreadArray(__spreadArray([], histories.training, true), [training], false) });
                if (updatedHistories) {
                    setHistories(updatedHistories);
                }
            }
            catch (error) {
                console.log(error);
            }
            return [2 /*return*/];
        });
    }); }, [getHistories, setHistories]);
    var handleSubmit = (0, react_1.useCallback)(function (training) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!selectedTraining) return [3 /*break*/, 2];
                    // Update existing training
                    return [4 /*yield*/, mutateUpdateAsync(__assign({ id: selectedTraining.id }, training))];
                case 1:
                    // Update existing training
                    _a.sent();
                    return [3 /*break*/, 5];
                case 2: 
                // Create new training
                return [4 /*yield*/, mutateAsync(training)];
                case 3:
                    // Create new training
                    _a.sent();
                    return [4 /*yield*/, onSubmit(training)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    refetchTrainings();
                    return [2 /*return*/];
            }
        });
    }); }, [mutateAsync, mutateUpdateAsync, onSubmit, selectedTraining]);
    var columns = __spreadArray([
        {
            header: t("trainingHistoryColumnProvider"),
            accessorKey: "provider",
        },
        {
            header: t("trainingHistoryColumnName"),
            accessorKey: "training_name",
        },
        {
            header: t("trainingHistoryColumnAwardedAt"),
            accessorKey: "awarded_at",
            cell: function (_a) {
                var row = _a.row;
                return (0, date_1.formatShortDate)(row.original.awarded_at);
            },
        },
        {
            header: t("trainingHistoryColumnExpiresAt"),
            accessorKey: "expires_at",
            cell: function (_a) {
                var row = _a.row;
                return (0, date_1.formatShortDate)(row.original.expires_at);
            },
        }
    ], (variant === api_1.EntityType.USER
        ? [
            {
                header: "",
                accessorKey: "actions",
                cell: function (_a) {
                    var row = _a.row;
                    return renderActions(row.original);
                },
            },
        ]
        : []), true);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h6", sx: { mb: 1 }, children: t("trainingHistoryTitle") }), (0, jsx_runtime_1.jsx)(Table_1.default, { data: trainingsData === null || trainingsData === void 0 ? void 0 : trainingsData.data, columns: columns, queryState: trainingDataQueryState, total: trainingsData === null || trainingsData === void 0 ? void 0 : trainingsData.data.length, noResultsMessage: t("noResultsMessage"), sx: { maxWidth: "100%" } }), variant === api_1.EntityType.USER && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(material_1.Button, { onClick: handleAddTraining, variant: "outlined", color: "primary", startIcon: (0, jsx_runtime_1.jsx)(icons_1.AddIcon, {}), sx: { mt: 2 }, children: t("addTrainingCourse") }), (0, jsx_runtime_1.jsx)(FormModal_1.default, { open: isModalOpen, heading: selectedTraining
                            ? t("editTrainingCourse")
                            : t("addTrainingCourse"), children: (0, jsx_runtime_1.jsx)(TrainingForm_1.default, { onSubmit: handleSubmit, isPending: isPending || putTrainingsQueryState.isPending, onCancel: handleCloseModal, initialValues: selectedTraining }) })] }))] }));
}
