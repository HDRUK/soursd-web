"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = putTrainingsQuery;
var putTrainings_1 = __importDefault(require("./putTrainings"));
function putTrainingsQuery(id) {
    return {
        mutationKey: ["putTrainingsQuery"],
        mutationFn: function (payload) {
            return (0, putTrainings_1.default)(id, payload, {
                error: {
                    message: "submitError",
                },
            });
        },
    };
}
