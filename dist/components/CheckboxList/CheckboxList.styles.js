"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledListItemText = exports.StyledListItem = void 0;
var styles_1 = require("@mui/material/styles");
var material_1 = require("@mui/material");
exports.StyledListItem = (0, styles_1.styled)(material_1.ListItem)(function (_a) {
    var theme = _a.theme;
    return ({
        borderBottom: "1px solid ".concat(theme.palette.greys.light),
        backgroundColor: "white",
        borderRadius: theme.shape.borderRadius,
        marginTop: theme.spacing(1),
        display: "flex",
        alignItems: "center",
        gap: theme.spacing(2),
        "&:first-of-type": {
            marginTop: 0,
        },
    });
});
exports.StyledListItemText = (0, styles_1.styled)(material_1.ListItemText)(function (_a) {
    var theme = _a.theme;
    return ({
        display: "flex",
        alignItems: "center",
        gap: theme.spacing(1),
        "& .MuiTypography-root": {
            fontWeight: "bold",
        },
    });
});
