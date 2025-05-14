"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RulesCheck;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var react_1 = require("react");
var NAMESPACE_TRANSLATION = "Rules";
var RULE_GROUPS = {
    DataSecurityCompliance: [
        {
            key: "certifications",
            fields: ["ce_certified", "iso_27001_certified"],
        },
        {
            key: "ceCertifiedPlus",
            fields: ["ce_certified_plus"],
        },
        {
            key: "dsptkCertified",
            fields: ["dsptk_certified"],
        },
    ],
};
function RulesCheck(_a) {
    var rules = _a.rules;
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION);
    var getPath = function (_a) {
        var _b;
        var failed_rules = _a.failed_rules, conditions = _a.conditions;
        return ((_b = failed_rules === null || failed_rules === void 0 ? void 0 : failed_rules.conditions) === null || _b === void 0 ? void 0 : _b.path) || (conditions === null || conditions === void 0 ? void 0 : conditions.path);
    };
    var getHeading = function (item) {
        var failed_rules = item.failed_rules, conditions = item.conditions, rule = item.rule;
        var defaultCondition = (failed_rules === null || failed_rules === void 0 ? void 0 : failed_rules.conditions) || conditions;
        var description = typeof (defaultCondition === null || defaultCondition === void 0 ? void 0 : defaultCondition.expects) === "string" && defaultCondition.expects;
        var tKey = "".concat((failed_rules === null || failed_rules === void 0 ? void 0 : failed_rules.rule) || rule, ".").concat(getPath(item));
        return !t.has(tKey) ? description : t(tKey);
    };
    var getNonGroupedRules = function (rules) {
        return rules
            .filter(function (_a) {
            var failed_rules = _a.failed_rules, rule = _a.rule;
            return !RULE_GROUPS[(failed_rules === null || failed_rules === void 0 ? void 0 : failed_rules.rule) || rule];
        })
            .map(function (rule) {
            var failed_rules = rule.failed_rules;
            return {
                heading: getHeading(rule),
                passed: !failed_rules,
                rules: [rule],
            };
        });
    };
    var getGroupedRules = function (rules) {
        var items = [];
        Object.keys(RULE_GROUPS).forEach(function (ruleName) {
            var ruleGroup = RULE_GROUPS[ruleName];
            ruleGroup.forEach(function (_a) {
                var fields = _a.fields, key = _a.key;
                var heading = t("".concat(ruleName, ".").concat(key));
                var pickedRules = [];
                fields.forEach(function (field) {
                    var currentRule = rules.find(function (rule) {
                        return getPath(rule) === field;
                    });
                    if (currentRule)
                        pickedRules.push(currentRule);
                });
                items.push({
                    heading: heading,
                    passed: pickedRules.some(function (rule) { return !rule.failed_rules; }),
                    rules: pickedRules,
                });
            });
        });
        return items;
    };
    var formattedRules = (0, react_1.useMemo)(function () {
        return __spreadArray(__spreadArray([], getNonGroupedRules(rules), true), getGroupedRules(rules), true);
    }, [rules]);
    return ((0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
            display: "flex",
            flexDirection: "column",
            gap: 2,
            flexGrow: 1,
        }, children: formattedRules.map(function (_a) {
            var heading = _a.heading, passed = _a.passed;
            return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { fontWeight: 600, children: heading }), (0, jsx_runtime_1.jsx)(material_1.Typography, { color: passed !== false ? "success.main" : "error.main", fontWeight: 600, children: passed !== false ? t("passed") : t("failed") })] }));
        }) }));
}
