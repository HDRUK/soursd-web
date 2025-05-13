"use strict";
"use server";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = fetchPredictions;
var GOOGLE_PLACES_AUTOCOMPLETE_URL = "https://maps.googleapis.com/maps/api/place/autocomplete/json";
var GOOGLE_PLACES_DETAILS_URL = "https://maps.googleapis.com/maps/api/place/details/json";
var API_KEY = process.env.GOOGLE_MAPS_API_KEY;
function fetchPredictions(input) {
    return __awaiter(this, void 0, void 0, function () {
        var autocompleteData, predictions, detailedResults, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!API_KEY) {
                        throw new Error("Missing one or more required environment variables: GOOGLE_MAPS_API_KEY");
                    }
                    if (!input) {
                        console.error("fetchPredictions called with empty input.");
                        return [2 /*return*/, []];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetchAutocomplete(input)];
                case 2:
                    autocompleteData = _a.sent();
                    predictions = (autocompleteData === null || autocompleteData === void 0 ? void 0 : autocompleteData.predictions) || [];
                    return [4 /*yield*/, Promise.all(predictions.map(function (prediction) { return fetchDetails(prediction); }))];
                case 3:
                    detailedResults = _a.sent();
                    return [2 /*return*/, detailedResults];
                case 4:
                    error_1 = _a.sent();
                    console.error("[fetchPredictions] Unexpected error:", error_1);
                    return [2 /*return*/, []];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function fetchAutocomplete(input) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, message, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    url = "".concat(GOOGLE_PLACES_AUTOCOMPLETE_URL, "?input=").concat(encodeURIComponent(input), "&key=").concat(API_KEY, "&types=address");
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        message = "Autocomplete fetch failed: ".concat(response.status, " ").concat(response.statusText);
                        console.error(message);
                        throw new Error(message);
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 3:
                    error_2 = _a.sent();
                    console.error("[fetchAutocomplete] Error:", error_2);
                    throw error_2;
                case 4: return [2 /*return*/];
            }
        });
    });
}
function fetchDetails(prediction) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, data, addressFields, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    url = "".concat(GOOGLE_PLACES_DETAILS_URL, "?place_id=").concat(prediction.place_id, "&key=").concat(API_KEY);
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        console.error("[fetchDetails] Failed to fetch details for place_id: ".concat(prediction.place_id, " (").concat(response.status, " ").concat(response.statusText, ")"));
                        return [2 /*return*/, { description: prediction.description, addressFields: null }];
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    addressFields = extractAddressFields(data.result);
                    return [2 /*return*/, {
                            description: prediction.description,
                            addressFields: addressFields,
                        }];
                case 3:
                    error_3 = _a.sent();
                    console.error("[fetchDetails] Error fetching details for place_id ".concat(prediction.place_id, ":"), error_3);
                    return [2 /*return*/, { description: prediction.description, addressFields: null }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function extractAddressFields(result) {
    var components = (result === null || result === void 0 ? void 0 : result.address_components) || [];
    var fields = {
        postcode: "",
        addressLine1: "",
        addressLine2: "",
        town: "",
        county: "",
        country: "",
    };
    components.forEach(function (component) {
        if (component.types.includes("postal_code")) {
            fields.postcode = component.long_name;
        }
        if (component.types.includes("street_number")) {
            fields.addressLine1 = component.short_name;
        }
        if (component.types.includes("route")) {
            fields.addressLine1 = "".concat(fields.addressLine1 ? "".concat(fields.addressLine1, " ") : "").concat(component.long_name);
        }
        if (component.types.includes("postal_town")) {
            fields.town = component.long_name;
        }
        if (component.types.includes("administrative_area_level_2")) {
            fields.county = component.long_name;
        }
        if (component.types.includes("country")) {
            fields.country = component.long_name;
        }
    });
    return fields;
}
