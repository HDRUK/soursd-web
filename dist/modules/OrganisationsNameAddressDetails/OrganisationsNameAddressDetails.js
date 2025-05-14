"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OrganisationsNameAddressDetails;
var jsx_runtime_1 = require("react/jsx-runtime");
var FieldsToText_1 = __importDefault(require("@/components/FieldsToText"));
var material_1 = require("@mui/material");
var SubsidiariesTable_1 = __importDefault(require("../SubsidiariesTable"));
var NAMESPACE_TRANSLATION = "Organisations";
function OrganisationsNameAddressDetails(_a) {
    var organisationData = _a.organisationData, _b = _a.tKey, tKey = _b === void 0 ? NAMESPACE_TRANSLATION : _b;
    return ((0, jsx_runtime_1.jsx)(FieldsToText_1.default, { data: organisationData, keys: [
            "organisation_name",
            {
                column_id: "address",
                content: ((0, jsx_runtime_1.jsx)(material_1.Typography, { children: [
                        "address_1",
                        "address_2",
                        "town",
                        "county",
                        "country",
                        "postcode",
                    ].map(function (key) { return ((0, jsx_runtime_1.jsx)("div", { children: organisationData[key] })); }) })),
            },
            {
                column_id: "subsidiaries",
                content: ((0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                        maxWidth: {
                            lg: "50%",
                        },
                    }, children: (0, jsx_runtime_1.jsx)(SubsidiariesTable_1.default, { subsidiariesData: organisationData.subsidiaries || [] }) })),
            },
        ], tKey: tKey }));
}
