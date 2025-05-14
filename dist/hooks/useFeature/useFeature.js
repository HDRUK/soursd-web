"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useFeature;
var features_1 = require("@/config/features");
var roles_1 = require("@/utils/roles");
var react_1 = require("react");
function useFeature(id) {
    var _a = features_1.FEATURES[id], permissions = _a.permissions, enabled = _a.enabled;
    var _b = (0, react_1.useState)(false), isAllowed = _b[0], setIsAllowed = _b[1];
    (0, react_1.useEffect)(function () {
        setIsAllowed((0, roles_1.isRoleValid)(permissions));
    }, [id]);
    return { isAllowed: isAllowed, enabled: enabled };
}
