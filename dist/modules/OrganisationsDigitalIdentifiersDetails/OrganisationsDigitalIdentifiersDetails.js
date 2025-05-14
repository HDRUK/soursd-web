"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OrganisationsDigitalIdentifiersDetails;
var jsx_runtime_1 = require("react/jsx-runtime");
var FieldsToText_1 = __importDefault(require("@/components/FieldsToText"));
var material_1 = require("@mui/material");
var CharitiesTable_1 = __importDefault(require("../CharitiesTable"));
var NAMESPACE_TRANSLATION = "Organisations";
function OrganisationsDigitalIdentifiersDetails(_a) {
    var organisationData = _a.organisationData, _b = _a.tKey, tKey = _b === void 0 ? NAMESPACE_TRANSLATION : _b;
    return ((0, jsx_runtime_1.jsx)(FieldsToText_1.default, { data: organisationData, keys: [
            {
                column_id: "organisation_unique_id",
            },
            "companies_house_no",
            "ror_id",
            {
                column_id: "charities",
                content: ((0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                        maxWidth: {
                            lg: "50%",
                        },
                    }, children: (0, jsx_runtime_1.jsx)(CharitiesTable_1.default, { charitiesData: organisationData.charities }) })),
            },
        ], tKey: tKey }));
}
