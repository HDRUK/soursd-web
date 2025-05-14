"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledMenuItem = void 0;
var styles_1 = require("@mui/material/styles");
var MenuItem_1 = __importDefault(require("@mui/material/MenuItem"));
exports.StyledMenuItem = (0, styles_1.styled)(MenuItem_1.default)(function (_a) {
    var theme = _a.theme;
    return ({
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        "&:last-child": {
            marginBottom: 0,
        },
        "&.unread": {
            backgroundColor: "#f5f5f5",
            fontWeight: "bold",
        },
        "&.read": {
            fontWeight: "normal",
        },
    });
});
