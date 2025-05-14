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
exports.default = ConfirmAffiliation;
var jsx_runtime_1 = require("react/jsx-runtime");
var ActionsPanel_1 = __importDefault(require("@/components/ActionsPanel"));
var icons_1 = require("@/consts/icons");
var cms_1 = require("@/mocks/data/cms");
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var react_query_1 = require("@tanstack/react-query");
var affiliations_1 = require("@/services/affiliations");
var types_1 = require("@/services/affiliations/types");
var store_1 = require("@/data/store");
var react_1 = require("react");
var useQueryAlerts_1 = __importDefault(require("@/hooks/useQueryAlerts"));
var NAMESPACE_TRANSLATION = "ConfirmAffiliation";
function ConfirmAffiliation() {
    var _this = this;
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION);
    var _a = (0, store_1.useStore)(function (state) { return ({
        currentUser: state.getCurrentUser(),
        organisation: state.getOrganisation(),
    }); }), currentUser = _a.currentUser, organisation = _a.organisation;
    var _b = (0, react_query_1.useQuery)((0, affiliations_1.getAffiliationsQuery)(currentUser === null || currentUser === void 0 ? void 0 : currentUser.registry_id)), affiliationsData = _b.data, refetch = _b.refetch, queryState = __rest(_b, ["data", "refetch"]);
    var currentPendingAffiliation = (0, react_1.useMemo)(function () {
        return affiliationsData === null || affiliationsData === void 0 ? void 0 : affiliationsData.data.data.find(function (affiliation) {
            return affiliation.organisation_id === (organisation === null || organisation === void 0 ? void 0 : organisation.id) &&
                affiliation.registryAffiliationState === "affiliation_pending";
        });
    }, [affiliationsData, organisation]);
    var _c = (0, react_query_1.useMutation)((0, affiliations_1.putRegistryHasAffiliationQuery)()), updateAffiliationStatus = _c.mutateAsync, mutateState = __rest(_c, ["mutateAsync"]);
    (0, useQueryAlerts_1.default)(mutateState);
    var handleClick = function (status) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateAffiliationStatus({
                        registryId: currentUser.registry_id,
                        affiliationId: currentPendingAffiliation === null || currentPendingAffiliation === void 0 ? void 0 : currentPendingAffiliation.id,
                        status: status,
                    })];
                case 1:
                    _a.sent();
                    refetch();
                    return [2 /*return*/];
            }
        });
    }); };
    return (currentPendingAffiliation && ((0, jsx_runtime_1.jsxs)(ActionsPanel_1.default, { heading: t("heading"), children: [cms_1.mockedPendingAffiliations, (0, jsx_runtime_1.jsxs)(material_1.Box, { sx: { display: "flex", gap: 1 }, children: [(0, jsx_runtime_1.jsx)(material_1.Button, { disabled: mutateState.isPending || queryState.isLoading, onClick: function () { return handleClick(types_1.AffiliationStatus.Approved); }, startIcon: (0, jsx_runtime_1.jsx)(icons_1.VerifyIcon, { sx: { color: "#fff" } }), children: t("confirmAffiliationButton") }), (0, jsx_runtime_1.jsx)(material_1.Button, { disabled: mutateState.isPending || queryState.isLoading, onClick: function () { return handleClick(types_1.AffiliationStatus.Rejected); }, startIcon: (0, jsx_runtime_1.jsx)(icons_1.RejectIcon, {}), variant: "outlined", sx: { background: "#fff" }, children: t("declineAffiliationButton") })] })] })));
}
