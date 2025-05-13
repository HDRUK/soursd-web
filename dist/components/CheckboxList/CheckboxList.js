"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var material_1 = require("@mui/material");
var FormControlCheckbox_1 = __importDefault(require("../FormControlCheckbox"));
var CheckboxList_styles_1 = require("./CheckboxList.styles");
var Skeleton_1 = __importDefault(require("./Skeleton"));
var CheckboxList = function (_a) {
    var _b = _a.isLoading, isLoading = _b === void 0 ? false : _b, items = _a.items, title = _a.title, checked = _a.checked, setChecked = _a.setChecked;
    (0, react_1.useEffect)(function () { }, [title, checked]);
    var handleChange = function (index) { return function (event) {
        var newChecked = __spreadArray([], checked, true);
        newChecked[index] = event.target.checked;
        setChecked(newChecked);
    }; };
    return ((0, jsx_runtime_1.jsxs)(material_1.List, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h6", sx: { mb: 2 }, children: title }), (0, jsx_runtime_1.jsx)(material_1.Box, { sx: { bgcolor: "#f2f2f2", padding: 1, borderRadius: 1 }, children: isLoading ? ((0, jsx_runtime_1.jsx)(Skeleton_1.default, {})) : (items.map(function (rule, index) { return ((0, jsx_runtime_1.jsx)(CheckboxList_styles_1.StyledListItem, { children: (0, jsx_runtime_1.jsx)(FormControlCheckbox_1.default, { name: "checkbox-".concat(rule.id), checked: checked[index] || false, onChange: handleChange(index), value: rule.id, label: (0, jsx_runtime_1.jsx)(CheckboxList_styles_1.StyledListItemText, { primary: (0, jsx_runtime_1.jsxs)(material_1.Typography, { children: [rule.label, ":"] }), secondary: rule.text }) }) }, rule.id)); })) })] }));
};
exports.default = react_1.default.memo(CheckboxList);
