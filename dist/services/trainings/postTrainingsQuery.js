"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = postTrainingsQuery;
var postTrainings_1 = __importDefault(require("./postTrainings"));
function postTrainingsQuery(registryId) {
    return {
        mutationKey: ["postTrainings", registryId],
        mutationFn: function (payload) {
            return (0, postTrainings_1.default)(registryId, payload, {
                error: { message: "postTrainingError" },
            });
        },
    };
}
