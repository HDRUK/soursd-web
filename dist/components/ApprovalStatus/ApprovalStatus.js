"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PermissionsStatus;
var jsx_runtime_1 = require("react/jsx-runtime");
var NewReleases_1 = __importDefault(require("@mui/icons-material/NewReleases"));
var Verified_1 = __importDefault(require("@mui/icons-material/Verified"));
var Text_1 = __importDefault(require("../Text"));
function PermissionsStatus(_a) {
    var isApproved = _a.isApproved, children = _a.children;
    return ((0, jsx_runtime_1.jsx)(Text_1.default, { endIcon: isApproved ? ((0, jsx_runtime_1.jsx)(Verified_1.default, { color: "success", titleAccess: "Approved" })) : ((0, jsx_runtime_1.jsx)(NewReleases_1.default, { color: "warning", titleAccess: "Not approved" })), children: children }));
}
