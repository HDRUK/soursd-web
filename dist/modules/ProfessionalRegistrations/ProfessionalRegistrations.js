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
exports.default = ProfessionalRegistrations;
var jsx_runtime_1 = require("react/jsx-runtime");
var ActionMenu_1 = require("../components/ActionMenu");
var ContactLink_1 = __importDefault(require("../components/ContactLink"));
var useQueryAlerts_1 = __importDefault(require("../../hooks/useQueryAlerts"));
var useQueryConfirmAlerts_1 = __importDefault(require("../../hooks/useQueryConfirmAlerts"));
var useMutationUpdateProfessionalRegistration_1 = __importDefault(require("../../queries/useMutationUpdateProfessionalRegistration"));
var professional_registrations_1 = require("../../services/professional_registrations");
var material_1 = require("@mui/material");
var Table_1 = __importDefault(require("../components/Table"));
var react_query_1 = require("@tanstack/react-query");
var next_intl_1 = require("next-intl");
var react_1 = require("react");
var server_1 = __importDefault(require("react-dom/server"));
var DeleteOutlineOutlined_1 = __importDefault(require("@mui/icons-material/DeleteOutlineOutlined"));
var CreateOutlined_1 = __importDefault(require("@mui/icons-material/CreateOutlined"));
var api_1 = require("@/types/api");
var icons_1 = require("../../consts/icons");
var ProfessionalRegistrationsFormModal_1 = __importDefault(require("./ProfessionalRegistrationsFormModal"));
var NAMESPACE_TRANSLATION_PROFILE = "ProfessionalRegistrations";
var NAMESPACE_TRANSLATION_APPLICATION = "Application";
function ProfessionalRegistrations(_a) {
    var _this = this;
    var _b;
    var variant = _a.variant, user = _a.user, setHistories = _a.setHistories, getHistories = _a.getHistories, professionalRegistrations = _a.professionalRegistrations;
    var _c = (0, react_1.useState)(false), isModalOpen = _c[0], setIsModalOpen = _c[1];
    var _d = (0, react_1.useState)(undefined), editRecord = _d[0], setEditRecord = _d[1];
    var _e = (0, react_1.useState)(false), isEditMode = _e[0], setIsEditMode = _e[1];
    var tProfile = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_PROFILE);
    var tApplication = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_APPLICATION);
    var _f = (0, react_query_1.useQuery)((0, professional_registrations_1.getProfessionalRegistrationsQuery)(user === null || user === void 0 ? void 0 : user.registry_id)), professionalRegistrationsData = _f.data, refetch = _f.refetch, getProfessionalRegistrationsQueryState = __rest(_f, ["data", "refetch"]);
    var _g = (0, useMutationUpdateProfessionalRegistration_1.default)(user === null || user === void 0 ? void 0 : user.registry_id), mutateAsync = _g.mutateAsync, resetPost = _g.reset, postProfessionalRegistrationQueryState = __rest(_g, ["mutateAsync", "reset"]);
    var _h = (0, react_query_1.useMutation)((0, professional_registrations_1.deleteProfessionalRegistrationQuery)()), mutateDeleteAsync = _h.mutateAsync, deleteProfessionalRegistrationQueryState = __rest(_h, ["mutateAsync"]);
    var _j = (0, react_query_1.useMutation)((0, professional_registrations_1.putProfessionalRegistrationQuery)(user === null || user === void 0 ? void 0 : user.registry_id)), mutatePutAsync = _j.mutateAsync, putProfessionalRegistrationQueryState = __rest(_j, ["mutateAsync"]);
    (0, useQueryAlerts_1.default)(isEditMode
        ? putProfessionalRegistrationQueryState
        : postProfessionalRegistrationQueryState, {
        commonAlertProps: {
            willClose: function () {
                if (!isEditMode) {
                    resetPost();
                }
                setIsModalOpen(false);
                setEditRecord(undefined);
                setIsEditMode(false);
            },
        },
        errorAlertProps: {
            text: isEditMode
                ? server_1.default.renderToString(tProfile.rich("errorPutMessage", {
                    contactLink: ContactLink_1.default,
                }))
                : server_1.default.renderToString(tProfile.rich("errorCreateMessage", {
                    contactLink: ContactLink_1.default,
                })),
        },
        successAlertProps: {
            text: isEditMode
                ? tProfile("successEditMessage")
                : tProfile("successCreateMessage"),
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
                            refetch();
                            return [2 /*return*/];
                    }
                });
            }); },
        },
        errorAlertProps: {
            text: server_1.default.renderToString(tProfile.rich("errorDeleteMessage", {
                contactLink: ContactLink_1.default,
            })),
        },
        successAlertProps: {
            text: tProfile("successDeleteMessage"),
        },
    });
    var handleDetailsSubmit = (0, react_1.useCallback)(function (fields) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isEditMode) return [3 /*break*/, 2];
                    return [4 /*yield*/, mutatePutAsync({
                            id: editRecord.id,
                            member_id: fields.member_id,
                            name: fields.name,
                        })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, mutateAsync(fields)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [4 /*yield*/, refetch()];
                case 5:
                    _a.sent();
                    setIsModalOpen(false);
                    setEditRecord(undefined);
                    setIsEditMode(false);
                    return [2 /*return*/];
            }
        });
    }); }, [isEditMode, editRecord, mutatePutAsync, mutateAsync, refetch]);
    var handleDelete = function (id) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            showDeleteConfirm(id);
            return [2 /*return*/];
        });
    }); };
    var data = (_b = professionalRegistrationsData === null || professionalRegistrationsData === void 0 ? void 0 : professionalRegistrationsData.data) === null || _b === void 0 ? void 0 : _b.data;
    (0, react_1.useEffect)(function () {
        if (data) {
            var storeHistories = getHistories();
            setHistories(__assign(__assign({}, storeHistories), { professionalRegistrations: data }));
        }
    }, [data, getHistories, setHistories]);
    var columns = (0, react_1.useMemo)(function () { return __spreadArray([
        {
            accessorKey: "name",
            header: tProfile("name"),
            cell: function (info) { return info.getValue(); },
        },
        {
            accessorKey: "member_id",
            header: tProfile("id"),
            cell: function (info) { return info.getValue(); },
        }
    ], (variant === api_1.EntityType.USER
        ? [
            {
                id: "actions",
                cell: function (_a) {
                    var row = _a.row;
                    return ((0, jsx_runtime_1.jsxs)(ActionMenu_1.ActionMenu, { "aria-label": "Action for ".concat(row.original.name), children: [(0, jsx_runtime_1.jsx)(ActionMenu_1.ActionMenuItem, { onClick: function () {
                                    setEditRecord(row.original);
                                    setIsEditMode(true);
                                    setIsModalOpen(true);
                                }, sx: { color: "menuList1.main" }, icon: (0, jsx_runtime_1.jsx)(CreateOutlined_1.default, { sx: { color: "menuList1.main" } }), children: tApplication("edit") }), (0, jsx_runtime_1.jsx)(ActionMenu_1.ActionMenuItem, { onClick: function () {
                                    handleDelete(row.original.id);
                                }, sx: { color: "error.main" }, icon: (0, jsx_runtime_1.jsx)(DeleteOutlineOutlined_1.default, { sx: { color: "error.main" } }), children: tApplication("delete") })] }));
                },
            },
        ]
        : []), true); }, [tProfile, tApplication, handleDelete]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ProfessionalRegistrationsFormModal_1.default, { open: isModalOpen, onClose: function () {
                    setIsModalOpen(false);
                    setEditRecord(undefined);
                    setIsEditMode(false);
                }, onSubmit: handleDetailsSubmit, queryState: isEditMode
                    ? putProfessionalRegistrationQueryState
                    : postProfessionalRegistrationQueryState, initialValues: editRecord, isEdit: isEditMode }), (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h6", sx: { mb: 1 }, children: tProfile("resultsTitle") }), (0, jsx_runtime_1.jsx)(Table_1.default, { columns: columns, data: professionalRegistrations, queryState: getProfessionalRegistrationsQueryState, noResultsMessage: tProfile("professionalRegistrationsNoResultsMessage"), errorMessage: tProfile.rich("professionalRegsitrationsErrorMessage", {
                    contactLink: ContactLink_1.default,
                }), total: professionalRegistrations.length, sx: { maxWidth: "100%" } }), variant === api_1.EntityType.USER && ((0, jsx_runtime_1.jsx)(material_1.Button, { startIcon: (0, jsx_runtime_1.jsx)(icons_1.AddIcon, {}), variant: "outlined", color: "primary", onClick: function () {
                    setEditRecord(undefined);
                    setIsEditMode(false);
                    setIsModalOpen(true);
                }, sx: { mt: 2 }, children: tProfile("addProfessionalRegistration") }))] }));
}
