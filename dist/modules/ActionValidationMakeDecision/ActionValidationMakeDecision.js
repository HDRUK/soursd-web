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
exports.default = ActionValidationMakeDecision;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var react_1 = require("react");
var react_query_1 = require("@tanstack/react-query");
var icons_1 = require("../../consts/icons");
var validation_logs_1 = require("../../services/validation_logs");
var store_1 = require("@/data/store");
var types_1 = require("../../services/validation_logs/types");
var next_intl_1 = require("next-intl");
var ChangeDecisionChip_1 = __importDefault(require("../components/ChangeDecisionChip"));
var ActionValidationCommentForm_1 = __importDefault(require("../components/ActionValidationCommentForm"));
var NAMESPACE_TRANSLATION_ACTION_VALIDATION_DECISION = "ActionValidationMakeDecision";
function ActionValidationMakeDecision(_a) {
    var _this = this;
    var log = _a.log, onAction = _a.onAction;
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION_ACTION_VALIDATION_DECISION);
    var _b = (0, react_1.useState)(log), currentLog = _b[0], setCurrentLog = _b[1];
    var user = (0, store_1.useStore)(function (store) { return store.getUser(); });
    var _c = (0, react_query_1.useMutation)((0, validation_logs_1.postValidationLogCommentQuery)()), createComment = _c.mutateAsync, isPendingPostComment = _c.isPending;
    var _d = (0, react_query_1.useMutation)((0, validation_logs_1.putValidationLogQuery)(currentLog.id)), updateLog = _d.mutateAsync, isPendingUpdateLog = _d.isPending;
    var _e = (0, react_1.useState)(null), selectedAction = _e[0], setSelectedAction = _e[1];
    var onSubmit = function (data) { return __awaiter(_this, void 0, void 0, function () {
        var comment, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!selectedAction)
                        return [2 /*return*/];
                    comment = data.comment;
                    return [4 /*yield*/, updateLog(selectedAction)];
                case 1:
                    res = _a.sent();
                    setCurrentLog(res.data);
                    return [4 /*yield*/, createComment({
                            user_id: user === null || user === void 0 ? void 0 : user.id,
                            validation_log_id: res.data.id,
                            comment: comment,
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (onAction === null || onAction === void 0 ? void 0 : onAction())];
                case 3:
                    _a.sent();
                    setSelectedAction(null);
                    return [2 /*return*/];
            }
        });
    }); };
    if (selectedAction) {
        return ((0, jsx_runtime_1.jsx)(ActionValidationCommentForm_1.default, { selectedAction: selectedAction, setSelectedAction: setSelectedAction, onSubmit: onSubmit, isLoading: isPendingUpdateLog || isPendingPostComment }));
    }
    if (currentLog.completed_at) {
        return ((0, jsx_runtime_1.jsx)(ChangeDecisionChip_1.default, { completed: currentLog.manually_confirmed === 1, onClick: function () {
                return setSelectedAction(currentLog.manually_confirmed === 1
                    ? types_1.ValidationLogAction.FAIL
                    : types_1.ValidationLogAction.PASS);
            } }));
    }
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: "flex", gap: 1, mt: 4 }, children: [(0, jsx_runtime_1.jsx)(material_1.Button, { "data-testid": "validation-log-initial-pass", onClick: function () { return setSelectedAction(types_1.ValidationLogAction.PASS); }, variant: "outlined", startIcon: (0, jsx_runtime_1.jsx)(icons_1.VerifyIcon, { fill: "inherit", color: "inherit" }), children: t("pass") }), (0, jsx_runtime_1.jsx)(material_1.Button, { "data-testid": "validation-log-initial-fail", onClick: function () { return setSelectedAction(types_1.ValidationLogAction.FAIL); }, variant: "outlined", startIcon: (0, jsx_runtime_1.jsx)(icons_1.RejectIcon, {}), children: t("fail") }), (0, jsx_runtime_1.jsx)(material_1.Button, { variant: "outlined", children: " \u2026" })] }));
}
