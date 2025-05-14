"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useMe;
var auth_1 = require("@/services/auth");
var react_query_1 = require("@tanstack/react-query");
function useMe() {
    var query = (0, react_query_1.useQuery)({
        queryKey: ["getMe"],
        queryFn: function () {
            return (0, auth_1.getMe)({
                error: {
                    message: "getMe",
                },
            });
        },
    });
    return query;
}
