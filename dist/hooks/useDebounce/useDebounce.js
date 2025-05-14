"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var search_1 = require("@/consts/search");
var useDebounce = function (value, delay, minLetters) {
    if (delay === void 0) { delay = 500; }
    if (minLetters === void 0) { minLetters = search_1.SEARCH_CHAR_LIMIT; }
    var _a = (0, react_1.useState)(value), debouncedValue = _a[0], setDebouncedValue = _a[1];
    (0, react_1.useEffect)(function () {
        if (typeof value === "string" &&
            minLetters !== undefined &&
            value.length < minLetters &&
            value.length > 0) {
            return undefined;
        }
        var handler = setTimeout(function () {
            setDebouncedValue(value);
        }, delay);
        return function () {
            clearTimeout(handler);
        };
    }, [value, delay, minLetters]);
    return [debouncedValue, setDebouncedValue];
};
exports.default = useDebounce;
