"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledListItemText = exports.StyledRadio = exports.StyledListItemButton = void 0;
var material_1 = require("@mui/material");
exports.StyledListItemButton = (0, material_1.styled)(material_1.ListItemButton)(function (_a) {
    var theme = _a.theme;
    return ({
        padding: theme.spacing(1),
        "&.Mui-selected": {
            backgroundColor: theme.palette.common.white,
            "&:hover": {
                backgroundColor: theme.palette.common.white,
            },
        },
        "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
    });
});
exports.StyledRadio = (0, material_1.styled)(material_1.Radio)(function (_a) {
    var theme = _a.theme;
    return ({
        color: theme.palette.action.active,
        "&.Mui-checked": {
            color: theme.palette.primary,
        },
    });
});
exports.StyledListItemText = (0, material_1.styled)(material_1.ListItemText)(function (_a) {
    var isSelected = _a.isSelected;
    return ({
        "& .MuiListItemText-primary": {
            fontSize: "0.875rem",
            fontWeight: isSelected ? 500 : 400,
        },
    });
});
