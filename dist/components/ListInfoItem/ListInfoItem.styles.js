"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledIcon = exports.StyledAlert = exports.StyledListInfoItem = void 0;
var material_1 = require("@mui/material");
exports.StyledListInfoItem = (0, material_1.styled)("div")(function () { return ({
    display: "flex",
    width: "100%",
    flexGrow: 1,
}); });
exports.StyledAlert = (0, material_1.styled)(material_1.Alert)(function (_a) {
    var _b;
    var theme = _a.theme;
    return ({
        width: "100%",
        backgroundColor: (_b = theme.palette.lightPurple) === null || _b === void 0 ? void 0 : _b.main,
        fontWeight: "bold",
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        "& .MuiAlert-message": {
            flexGrow: 1,
            width: "100%",
        },
    });
});
exports.StyledIcon = (0, material_1.styled)("div")(function (_a) {
    var theme = _a.theme;
    return ({
        width: theme.spacing(4),
        height: theme.spacing(4),
        borderRadius: "50%",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: theme.typography.body2.fontSize,
    });
});
