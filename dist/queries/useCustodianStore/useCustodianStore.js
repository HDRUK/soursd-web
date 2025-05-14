"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useCustodianStore;
var store_1 = require("@/data/store");
var custodians_1 = require("@/services/custodians");
var react_query_1 = require("@tanstack/react-query");
var react_1 = require("react");
function useCustodianStore() {
    var _a = (0, store_1.useStore)(function (state) { return [
        state.getCustodian(),
        state.setCustodian,
    ]; }), custodian = _a[0], setCustodian = _a[1];
    var custodianData = (0, react_query_1.useQuery)((0, custodians_1.getCustodianQuery)(custodian === null || custodian === void 0 ? void 0 : custodian.id)).data;
    (0, react_1.useEffect)(function () {
        if (custodianData === null || custodianData === void 0 ? void 0 : custodianData.data)
            setCustodian(custodianData.data);
    }, [custodianData === null || custodianData === void 0 ? void 0 : custodianData.data]);
    return custodian;
}
