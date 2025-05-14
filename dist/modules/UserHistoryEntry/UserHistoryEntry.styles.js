"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledCertificationLink = void 0;
var styles_1 = require("@mui/material/styles");
var material_1 = require("@mui/material");
exports.StyledCertificationLink = (0, styles_1.styled)(material_1.Link, {
    shouldForwardProp: function (prop) { return prop !== "hasCertification"; },
})(function (_a) {
    var theme = _a.theme, hasCertification = _a.hasCertification;
    return ({
        color: hasCertification
            ? theme.palette.success.main
            : theme.palette.error.main,
        marginLeft: "5px",
        cursor: hasCertification ? "pointer" : "not-allowed",
        "&:hover": {
            textDecoration: hasCertification ? "underline" : "none",
        },
    });
});
