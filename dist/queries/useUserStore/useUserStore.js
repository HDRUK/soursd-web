"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useUserStore;
var store_1 = require("@/data/store");
var users_1 = require("@/services/users");
var react_query_1 = require("@tanstack/react-query");
var react_1 = require("react");
function useUserStore() {
    var _a = (0, store_1.useStore)(function (state) { return [state.getUser(), state.setUser]; }), user = _a[0], setUser = _a[1];
    var userData = (0, react_query_1.useQuery)((0, users_1.getUserQuery)(user === null || user === void 0 ? void 0 : user.id)).data;
    (0, react_1.useEffect)(function () {
        if (userData === null || userData === void 0 ? void 0 : userData.data)
            setUser(userData.data);
    }, [userData === null || userData === void 0 ? void 0 : userData.data]);
    return user;
}
