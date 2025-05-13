"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Markdown;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_markdown_1 = __importDefault(require("react-markdown"));
var remark_gfm_1 = __importDefault(require("remark-gfm"));
var material_1 = require("@mui/material");
var SectionHeading_1 = __importDefault(require("../SectionHeading"));
var FormControlDescription_1 = __importDefault(require("../FormControlDescription"));
var subtitleComponents = {
    p: function (_a) {
        var children = _a.children;
        return (0, jsx_runtime_1.jsx)(FormControlDescription_1.default, { children: children });
    },
};
var tableComponents = {
    table: function (_a) {
        var children = _a.children;
        return ((0, jsx_runtime_1.jsx)(material_1.TableContainer, { component: material_1.Paper, sx: { my: 2, width: "70%", margin: "0 auto" }, children: (0, jsx_runtime_1.jsx)(material_1.Table, { sx: {
                    borderCollapse: "collapse",
                }, children: children }) }));
    },
    thead: function (_a) {
        var children = _a.children;
        return (0, jsx_runtime_1.jsx)(material_1.TableHead, { children: children });
    },
    tbody: function (_a) {
        var children = _a.children;
        return (0, jsx_runtime_1.jsx)(material_1.TableBody, { children: children });
    },
    tr: function (_a) {
        var children = _a.children;
        return (0, jsx_runtime_1.jsx)(material_1.TableRow, { children: children });
    },
    th: function (_a) {
        var children = _a.children;
        return ((0, jsx_runtime_1.jsx)(material_1.TableCell, { component: "th", sx: {
                fontWeight: "bold",
                fontSize: "1.2rem",
                backgroundColor: "default.main",
                color: "default.contrastText",
                border: "1px solid #ccc",
            }, children: children }));
    },
    td: function (_a) {
        var children = _a.children;
        return ((0, jsx_runtime_1.jsx)(material_1.TableCell, { component: "td", sx: {
                fontSize: "1.2rem",
                border: "1px solid #ccc",
            }, children: children }));
    },
};
var defaultComponents = __assign(__assign({}, tableComponents), { h1: function (_a) {
        var children = _a.children;
        return (0, jsx_runtime_1.jsx)(SectionHeading_1.default, { variant: "h2", size: "large", heading: children });
    }, h3: function (_a) {
        var _node = _a.node, children = _a.children, rest = __rest(_a, ["node", "children"]);
        return ((0, jsx_runtime_1.jsx)("h3", __assign({ style: { fontWeight: "normal" } }, rest, { children: children })));
    } });
var legalComponents = {
    h1: function (_a) {
        var _node = _a.node, children = _a.children, rest = __rest(_a, ["node", "children"]);
        return ((0, jsx_runtime_1.jsx)("h3", __assign({ style: { fontWeight: "bold" } }, rest, { children: children })));
    },
    h2: function (_a) {
        var _node = _a.node, children = _a.children, rest = __rest(_a, ["node", "children"]);
        return ((0, jsx_runtime_1.jsx)("h4", __assign({ style: { fontWeight: "normal" } }, rest, { children: children })));
    },
    h3: function (_a) {
        var _node = _a.node, children = _a.children, rest = __rest(_a, ["node", "children"]);
        return ((0, jsx_runtime_1.jsx)("p", __assign({ style: { marginLeft: "20px" } }, rest, { children: children })));
    },
};
function Markdown(_a) {
    var children = _a.children, _b = _a.variant, variant = _b === void 0 ? "plain" : _b, props = __rest(_a, ["children", "variant"]);
    var selectedComponents;
    switch (variant) {
        case "subtitle":
            selectedComponents = __assign(__assign({}, defaultComponents), subtitleComponents);
            break;
        case "legal":
            selectedComponents = __assign(__assign({}, defaultComponents), legalComponents);
            break;
        default:
            selectedComponents = __assign({}, defaultComponents);
    }
    return ((0, jsx_runtime_1.jsx)(react_markdown_1.default, __assign({ remarkPlugins: [remark_gfm_1.default], components: selectedComponents }, props, { children: children })));
}
