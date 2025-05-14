"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Feature;
var useFeature_1 = __importDefault(require("@/hooks/useFeature"));
function Feature(_a) {
    var id = _a.id, children = _a.children;
    var isAllowed = (0, useFeature_1.default)(id).isAllowed;
    return isAllowed ? children : null;
}
