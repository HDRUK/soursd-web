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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
exports.default = ChipStatus;
var jsx_runtime_1 = require("react/jsx-runtime");
var material_1 = require("@mui/material");
var next_intl_1 = require("next-intl");
var Status;
(function (Status) {
    Status["AFFILIATED"] = "affiliated";
    Status["PENDING"] = "pending";
    Status["INVITED"] = "invited";
    Status["REGISTERED"] = "registered";
    Status["INVITE_SENT"] = "invite_sent";
    Status["APPROVED"] = "approved";
    Status["COMPLETED"] = "completed";
    Status["PROJECT_APPROVED"] = "project_approved";
    Status["PROJECT_COMPLETED"] = "project_completed";
    Status["PROJECT_PENDING"] = "project_pending";
    Status["AFFILIATION_INVITED"] = "affiliation_invited";
    Status["AFFILIATION_PENDING"] = "affiliation_pending";
    Status["AFFILIATION_APPROVED"] = "affiliation_approved";
    Status["AFFILIATION_REJECTED"] = "affiliation_rejected";
})(Status || (exports.Status = Status = {}));
var NAMESPACE_TRANSLATION = "Application";
function ChipStatus(_a) {
    var status = _a.status, restProps = __rest(_a, ["status"]);
    var t = (0, next_intl_1.useTranslations)(NAMESPACE_TRANSLATION);
    var chipProps = {
        color: "midGrey",
    };
    if (status === Status.AFFILIATED ||
        status === Status.APPROVED ||
        status === Status.PROJECT_APPROVED ||
        status === Status.AFFILIATION_APPROVED) {
        chipProps = {
            color: "success",
        };
    }
    else if (status === Status.AFFILIATION_REJECTED) {
        chipProps = {
            color: "error",
        };
    }
    else if (status === Status.COMPLETED ||
        status === Status.PROJECT_COMPLETED) {
        chipProps = {
            color: "clear",
            border: "1px solid",
            borderColor: "midGrey",
        };
    }
    else if (!status) {
        chipProps = {
            color: "warning",
        };
    }
    var color = chipProps.color, restChipSxProps = __rest(chipProps, ["color"]);
    return ((0, jsx_runtime_1.jsx)(material_1.Chip, __assign({ label: t("status_".concat(status)), size: "small" }, restProps, { sx: __assign(__assign({ backgroundColor: "".concat(color, ".main"), "& > .MuiChip-label": {
                color: "".concat(color, ".contrastText"),
            } }, restChipSxProps), restProps.sx) })));
}
