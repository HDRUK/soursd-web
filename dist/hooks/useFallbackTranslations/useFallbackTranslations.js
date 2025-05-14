"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var next_intl_1 = require("next-intl");
var string_1 = require("@/utils/string");
function useFallbackTranslations(namespace) {
    var t = (0, next_intl_1.useTranslations)(namespace);
    return function (key) {
        var hasTitle = t.raw(key) !== "".concat(namespace, ".").concat(key);
        return hasTitle ? t(key) : (0, string_1.toTitleCase)(key);
    };
}
exports.default = useFallbackTranslations;
