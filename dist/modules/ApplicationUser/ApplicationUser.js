"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ApplicationUser;
var jsx_runtime_1 = require("react/jsx-runtime");
var LoadingWrapper_1 = __importDefault(require("../components/LoadingWrapper"));
var store_1 = require("@/data/store");
var getMeQuery_1 = __importDefault(require("../../services/auth/getMeQuery"));
var react_query_1 = require("@tanstack/react-query");
var react_1 = require("react");
function ApplicationUser(_a) {
    var children = _a.children;
    var _b = (0, react_query_1.useQuery)((0, getMeQuery_1.default)()), user = _b.data, isLoading = _b.isLoading;
    var setUser = (0, store_1.useStore)(function (state) { return state.setUser; });
    (0, react_1.useEffect)(function () {
        if (user === null || user === void 0 ? void 0 : user.data) {
            setUser(user.data);
        }
        else {
            setUser({});
        }
    }, [user === null || user === void 0 ? void 0 : user.data]);
    return ((0, jsx_runtime_1.jsx)(LoadingWrapper_1.default, { loading: isLoading, variant: "basic", children: children }));
}
