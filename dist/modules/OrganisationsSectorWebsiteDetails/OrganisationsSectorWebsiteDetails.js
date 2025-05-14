"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OrganisationsSectorWebsiteDetails;
var jsx_runtime_1 = require("react/jsx-runtime");
var FieldsToText_1 = __importDefault(require("@/components/FieldsToText"));
var material_1 = require("@mui/material");
var NAMESPACE_TRANSLATION = "Organisations";
function OrganisationsSectorWebsiteDetails(_a) {
    var organisationData = _a.organisationData, _b = _a.tKey, tKey = _b === void 0 ? NAMESPACE_TRANSLATION : _b;
    return ((0, jsx_runtime_1.jsx)(FieldsToText_1.default, { data: organisationData, keys: [
            {
                column_id: "sector.name",
                heading: "sectorName",
            },
            "organisation_size",
            {
                column_id: "website",
                content: ((0, jsx_runtime_1.jsx)(material_1.Link, { href: organisationData.website, target: "_blank", children: organisationData.website })),
            },
        ], tKey: tKey }));
}
