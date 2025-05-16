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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var icons_1 = require("../../consts/icons");
var users_1 = require("../../services/users");
var react_query_1 = require("@tanstack/react-query");
var showAlert_1 = require("../../utils/showAlert");
var ActionMenu_1 = require("../ActionMenu");
var next_intl_1 = require("next-intl");
var store_1 = require("@/data/store");
var DecoupleDelegate = function (_a) {
    var user = _a.user, onSuccess = _a.onSuccess, payload = _a.payload, namespace = _a.namespace;
    var t = (0, next_intl_1.useTranslations)(namespace);
    var organisation = (0, store_1.useStore)(function (state) { return state.config.organisation; });
    var mutateAsync = (0, react_query_1.useMutation)({
        mutationKey: ["patchUser"],
        mutationFn: function (payload) {
            return (0, users_1.patchUser)(user.id, payload, {
                error: {
                    message: "submitError",
                },
            });
        },
    }).mutateAsync;
    var first_name = user.first_name, last_name = user.last_name;
    var organisation_name = (organisation || {}).organisation_name;
    var handleDecoupleUser = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            (0, showAlert_1.showAlert)("warning", {
                text: t("alertText", {
                    first_name: first_name,
                    last_name: last_name,
                    organisation_name: organisation_name,
                }),
                title: t("alertTitle"),
                confirmButtonText: t("alertConfirm"),
                cancelButtonText: t("alertCancel"),
                closeOnConfirm: true,
                closeOnCancel: true,
                preConfirm: function () {
                    (0, showAlert_1.showLoadingAlertWithPromise)(mutateAsync(payload), {
                        onSuccess: onSuccess,
                    });
                },
            });
            return [2 /*return*/];
        });
    }); };
    return ((0, jsx_runtime_1.jsx)(ActionMenu_1.ActionMenuItem, { sx: { color: "error.main" }, onClick: handleDecoupleUser, icon: (0, jsx_runtime_1.jsx)(icons_1.TrashIcon, {}), children: t("title") }));
};
exports.default = DecoupleDelegate;
