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
exports.default = NotificationModal;
var jsx_runtime_1 = require("react/jsx-runtime");
var ChevronLeft_1 = __importDefault(require("@mui/icons-material/ChevronLeft"));
var Close_1 = __importDefault(require("@mui/icons-material/Close"));
var material_1 = require("@mui/material");
var Check_1 = __importDefault(require("@mui/icons-material/Check"));
var Pending_1 = __importDefault(require("@mui/icons-material/Pending"));
var MarkEmailUnread_1 = __importDefault(require("@mui/icons-material/MarkEmailUnread"));
var date_1 = require("@/utils/date");
var string_1 = require("@/utils/string");
var notifications_1 = require("@/utils/notifications");
var next_intl_1 = require("next-intl");
var usePatchReadRequest_1 = __importDefault(require("../NotificationsMenu/hooks/usePatchReadRequest"));
var NAMESPACE_TRANSLATIONS = "NotificationsModal";
function NotificationModal(_a) {
    var _b, _c;
    var _this = this;
    var _d;
    var notification = _a.notification, isLoading = _a.isLoading, onClose = _a.onClose, handleMarkAsUnread = _a.handleMarkAsUnread, onBack = _a.onBack, sx = _a.sx, restProps = __rest(_a, ["notification", "isLoading", "onClose", "handleMarkAsUnread", "onBack", "sx"]);
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATIONS);
    var theme = (0, material_1.useTheme)();
    var mobileMediaQuery = theme.breakpoints.down("sm");
    var mutateReadRequest = (0, usePatchReadRequest_1.default)().mutateAsync;
    var approveOrDenyRequest = function (requestId, status) { return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!requestId || !status)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, mutateReadRequest({
                            requestId: requestId,
                            status: status,
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error approving/denying request:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleApproveOrDeny = function (requestId, status) {
        approveOrDenyRequest(requestId, status);
    };
    return ((0, jsx_runtime_1.jsx)(material_1.Modal, __assign({ "data-testid": "notification-modal", onClose: onClose, sx: { p: 1 } }, restProps, { children: (0, jsx_runtime_1.jsxs)(material_1.Card, { sx: __assign((_b = { top: "50%", left: "50%", transform: "translate(-50%, -50%)", position: "absolute", overflowY: "scroll", maxHeight: "calc(100vh - ".concat(theme.spacing(4), ")"), minWidth: "600px" }, _b[mobileMediaQuery] = {
                width: "calc(100% - ".concat(theme.spacing(2), ")"),
                minWidth: "auto",
            }, _b.paddingTop = 4, _b), sx), children: [(0, jsx_runtime_1.jsx)(material_1.CardHeader, { "data-testid": "notification-modal-header", title: notification === null || notification === void 0 ? void 0 : notification.data.message, subheader: (0, jsx_runtime_1.jsxs)("span", { children: [(0, notifications_1.formatNotificationType)(notification.type), " - ", (0, date_1.formatDBDate)(notification.data.time)] }) }), (0, jsx_runtime_1.jsxs)(material_1.CardContent, { sx: (_c = {
                            mt: 0,
                            pt: 0,
                            px: 4
                        },
                        _c[mobileMediaQuery] = {
                            px: 2,
                        },
                        _c), children: [onBack && ((0, jsx_runtime_1.jsx)(material_1.Box, { sx: { position: "absolute", top: 5, left: 5 }, children: (0, jsx_runtime_1.jsx)("span", { children: (0, jsx_runtime_1.jsx)(material_1.IconButton, { onClick: onBack, children: (0, jsx_runtime_1.jsx)(ChevronLeft_1.default, {}) }) }) })), (0, jsx_runtime_1.jsx)(material_1.Box, { sx: { position: "absolute", top: 5, right: 5 }, children: (0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)(material_1.Tooltip, { title: t("toolTipMarkAsUnread"), children: (0, jsx_runtime_1.jsx)(material_1.IconButton, { onClick: handleMarkAsUnread, "data-testid": "mark-notification-as-unread-button", children: (0, jsx_runtime_1.jsx)(MarkEmailUnread_1.default, {}) }) }), (0, jsx_runtime_1.jsx)(material_1.IconButton, { onClick: function (e) { return onClose(e, "escapeKeyDown"); }, children: (0, jsx_runtime_1.jsx)(Close_1.default, {}) })] }) }), isLoading && ((0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }, children: (0, jsx_runtime_1.jsx)(material_1.CircularProgress, {}) })), Array.isArray(notification.data.actions) && ((0, jsx_runtime_1.jsx)(material_1.List, { sx: {
                                width: "100%",
                                maxWidth: 360,
                                bgcolor: "background.paper",
                            }, children: notification.data.actions.map(function (action) { return ((0, jsx_runtime_1.jsxs)(material_1.ListItem, { children: [(0, jsx_runtime_1.jsx)(material_1.ListItemIcon, { children: action.completed_at ? ((0, jsx_runtime_1.jsx)(Check_1.default, { color: "success" })) : ((0, jsx_runtime_1.jsx)(Pending_1.default, {})) }), (0, jsx_runtime_1.jsx)(material_1.ListItemText, { primary: (0, string_1.toTitleCase)(action.action), secondary: action.completed_at && (0, date_1.formatDBDate)(action.completed_at) })] })); }) })), Array.isArray(notification.data.details) ? ((0, jsx_runtime_1.jsx)(material_1.TableContainer, { component: material_1.Paper, sx: { marginTop: 0, width: "100%" }, children: (0, jsx_runtime_1.jsxs)(material_1.Table, { size: "small", children: [(0, jsx_runtime_1.jsx)(material_1.TableHead, { children: (0, jsx_runtime_1.jsxs)(material_1.TableRow, { children: [(0, jsx_runtime_1.jsx)(material_1.TableCell, { children: t("col1") }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { align: "right", children: t("col2") }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { align: "right", children: t("col3") })] }) }), (0, jsx_runtime_1.jsx)(material_1.TableBody, { children: notification.data.details.map(function (_a) {
                                            var key = _a.key, old = _a.old, newValue = _a.new;
                                            return ((0, jsx_runtime_1.jsxs)(material_1.TableRow, { children: [(0, jsx_runtime_1.jsx)(material_1.TableCell, { component: "th", scope: "row", children: key }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { align: "right", children: old }), (0, jsx_runtime_1.jsx)(material_1.TableCell, { align: "right", children: newValue })] }, key));
                                        }) })] }) })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(material_1.Box, { sx: { mb: 1 }, 
                                    /* This purposefully doesn't use DOMPurify as we explicitly control the content from the API */
                                    dangerouslySetInnerHTML: {
                                        __html: notification.data.details || "No further details.",
                                    } }), (0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                                        mb: 1,
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        gap: 1,
                                    }, children: Object.entries((_d = notification.data.buttonUrls) !== null && _d !== void 0 ? _d : {}).map(function (_a) {
                                        var name = _a[0], id = _a[1];
                                        return ((0, jsx_runtime_1.jsx)(material_1.Button, { variant: "contained", color: name === "Approve" ? "primary" : "secondary", onClick: function () {
                                                handleApproveOrDeny(id, name === "Approve" ? 1 : 2);
                                            }, children: name }, id));
                                    }) })] }))] })] }) })));
}
