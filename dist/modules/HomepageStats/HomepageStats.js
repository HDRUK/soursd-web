"use strict";
"use client";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HomepageStats;
var jsx_runtime_1 = require("react/jsx-runtime");
var StatsBox_1 = __importDefault(require("../components/StatsBox"));
var HomepageStats_styles_1 = require("./HomepageStats.styles");
function HomepageStats(_a) {
    var statsBoxProps = _a.statsBoxProps;
    var mergedStatsBoxProps = __assign({ color: "highlight", elevation: 0 }, statsBoxProps);
    return ((0, jsx_runtime_1.jsxs)(HomepageStats_styles_1.StyledHomepageStats, { children: [(0, jsx_runtime_1.jsx)(StatsBox_1.default, __assign({ description: "Data Access Requests Processed", value: "162,000" }, mergedStatsBoxProps)), (0, jsx_runtime_1.jsx)(StatsBox_1.default, __assign({ description: "Verififed Researchers", value: "36,000" }, mergedStatsBoxProps)), (0, jsx_runtime_1.jsx)(StatsBox_1.default, __assign({ description: "Researcher Endorsements Recorded", value: "1.3 m" }, mergedStatsBoxProps))] }));
}
