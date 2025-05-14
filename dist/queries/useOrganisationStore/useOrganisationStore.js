"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useOrganisationStore;
var store_1 = require("@/data/store");
var organisations_1 = require("@/services/organisations");
var react_query_1 = require("@tanstack/react-query");
var react_1 = require("react");
function useOrganisationStore() {
    var _a = (0, store_1.useStore)(function (state) { return [
        state.getOrganisation(),
        state.setOrganisation,
    ]; }), organisation = _a[0], setOrganisation = _a[1];
    var organisationData = (0, react_query_1.useQuery)((0, organisations_1.getOrganisationQuery)(organisation === null || organisation === void 0 ? void 0 : organisation.id)).data;
    (0, react_1.useEffect)(function () {
        if (organisationData === null || organisationData === void 0 ? void 0 : organisationData.data)
            setOrganisation(organisationData.data);
    }, [organisationData === null || organisationData === void 0 ? void 0 : organisationData.data]);
    return organisation;
}
