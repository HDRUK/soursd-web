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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var Search_1 = __importDefault(require("@mui/icons-material/Search"));
var material_1 = require("@mui/material");
var useDebounce_1 = __importDefault(require("@/hooks/useDebounce"));
var react_hook_form_1 = require("react-hook-form");
var react_1 = require("react");
var address_3 = require("@/utils/address");
var actions_1 = __importDefault(require("./actions"));
var GoogleAutocomplete = function (_a) {
    var control = _a.control, name = _a.name, label = _a.label, placeholder = _a.placeholder, onAddressSelected = _a.onAddressSelected, _b = _a.fullWidth, fullWidth = _b === void 0 ? true : _b, textFieldProps = _a.textFieldProps;
    var context = (0, react_hook_form_1.useFormContext)();
    var effectiveControl = control || context.control;
    var controller = (0, react_hook_form_1.useController)({ control: effectiveControl, name: name });
    var field = controller.field;
    var value = field.value, onChange = field.onChange;
    var _c = (0, react_1.useState)([]), options = _c[0], setOptions = _c[1];
    var _d = (0, react_1.useState)(false), loading = _d[0], setLoading = _d[1];
    var _e = (0, react_1.useState)((0, address_3.formatAddress)(value)), inputValue = _e[0], setInputValue = _e[1];
    var debouncedInputValue = (0, useDebounce_1.default)(inputValue, 500)[0];
    var isFirstRender = (0, react_1.useRef)(true);
    (0, react_1.useEffect)(function () {
        if (isFirstRender.current && value) {
            isFirstRender.current = false;
            var label_1 = (0, address_3.formatAddress)(value);
            if (options.find(function (option) { return option.label === label_1; }))
                return;
            setOptions(function (prevOptions) { return __spreadArray([
                {
                    label: label_1,
                    value: value,
                }
            ], prevOptions, true); });
        }
    }, []);
    (0, react_1.useEffect)(function () {
        if ((0, address_3.formatAddress)(value) === debouncedInputValue)
            return;
        var fetchOptions = function () { return __awaiter(void 0, void 0, void 0, function () {
            var predictions, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!debouncedInputValue) {
                            return [2 /*return*/];
                        }
                        setLoading(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, (0, actions_1.default)(debouncedInputValue)];
                    case 2:
                        predictions = _a.sent();
                        setOptions(predictions
                            .map(function (place) {
                            var addressFields = place.addressFields;
                            var addressLine1 = addressFields.addressLine1, addressLine2 = addressFields.addressLine2, restAddress = __rest(addressFields, ["addressLine1", "addressLine2"]);
                            var value = __assign({ address_1: addressLine1, address_2: addressLine2 }, restAddress);
                            return {
                                label: (0, address_3.formatAddress)(value),
                                value: value,
                            };
                        })
                            .reduce(function (uniqueOptions, currentOption) {
                            var seenLabels = new Set(uniqueOptions.map(function (option) { return option.label; }));
                            if (!seenLabels.has(currentOption.label)) {
                                uniqueOptions.push(currentOption);
                            }
                            return uniqueOptions;
                        }, []));
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        console.error("Error fetching address predictions:", error_1);
                        setOptions([]);
                        return [3 /*break*/, 5];
                    case 4:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        fetchOptions();
    }, [debouncedInputValue]);
    var handleInputChange = function (_, newInputValue) {
        setInputValue(newInputValue);
    };
    var getOptionLabel = function (option) {
        if (typeof option === "string")
            return option;
        if (option === null || option === void 0 ? void 0 : option.label)
            return option.label;
        if ((option === null || option === void 0 ? void 0 : option.value) && (0, address_3.formatAddress)(option.value))
            return (0, address_3.formatAddress)(option.value);
        return "";
    };
    var handleOptionSelect = function (_, newValue) {
        var selected = typeof newValue === "string" ? newValue : newValue === null || newValue === void 0 ? void 0 : newValue.value;
        if (selected) {
            onChange(onAddressSelected ? onAddressSelected(selected) : selected);
        }
    };
    return ((0, jsx_runtime_1.jsx)(material_1.Autocomplete, { fullWidth: fullWidth, freeSolo: true, "data-testid": "google-autocomplete", options: options, getOptionLabel: getOptionLabel, onInputChange: handleInputChange, onChange: handleOptionSelect, value: options.find(function (option) { return option.value === value; }) || "", loading: loading, renderInput: function (params) { return ((0, jsx_runtime_1.jsx)(material_1.TextField, __assign({}, params, { label: label, fullWidth: fullWidth, size: "small" }, textFieldProps, { sx: !label
                ? {
                    ".MuiFilledInput-root.MuiInputBase-root": {
                        p: "8.5px 14px",
                    },
                }
                : {}, InputProps: __assign(__assign({}, params.InputProps), { placeholder: placeholder, endAdornment: ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [loading ? ((0, jsx_runtime_1.jsx)(material_1.CircularProgress, { color: "inherit", size: 20 })) : ((0, jsx_runtime_1.jsx)(Search_1.default, {})), params.InputProps.endAdornment] })) }) }))); } }));
};
exports.default = GoogleAutocomplete;
