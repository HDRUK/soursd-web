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
var jsx_runtime_1 = require("react/jsx-runtime");
var x_date_pickers_1 = require("@mui/x-date-pickers");
var AdapterDateFnsV3_1 = require("@mui/x-date-pickers/AdapterDateFnsV3");
var DatePicker_1 = require("@mui/x-date-pickers/DatePicker");
var next_intl_1 = require("next-intl");
var en_GB_1 = require("date-fns/locale/en-GB");
var date_1 = require("@/consts/date");
var dayjs_1 = __importDefault(require("dayjs"));
var DateInput = function (_a) {
    var label = _a.label, value = _a.value, onChange = _a.onChange, id = _a.id, _b = _a.format, dateFormat = _b === void 0 ? "dd/MM/yyyy" : _b, rest = __rest(_a, ["label", "value", "onChange", "id", "format"]);
    var localeString = (0, next_intl_1.useLocale)();
    var locale = localeString === "en" ? en_GB_1.enGB : en_GB_1.enGB; // Add more locales as needed
    var parseDate = function (dateValue) {
        if (!dateValue)
            return null;
        return (0, dayjs_1.default)(dateValue).format(date_1.FORMAT_DATE_DB);
    };
    var handleChange = function (value, context) {
        onChange === null || onChange === void 0 ? void 0 : onChange(parseDate(value), context);
    };
    return ((0, jsx_runtime_1.jsx)(x_date_pickers_1.LocalizationProvider, { dateAdapter: AdapterDateFnsV3_1.AdapterDateFns, adapterLocale: locale, children: (0, jsx_runtime_1.jsx)(DatePicker_1.DatePicker, __assign({ label: label, value: value, onChange: handleChange, format: dateFormat, slotProps: {
                textField: {
                    id: id,
                    fullWidth: true,
                    variant: "outlined",
                    size: "small",
                    inputProps: {
                        "data-testid": rest === null || rest === void 0 ? void 0 : rest["data-testid"],
                        "aria-labelledby": rest === null || rest === void 0 ? void 0 : rest["aria-labelledby"],
                    },
                },
            } }, rest)) }));
};
exports.default = DateInput;
