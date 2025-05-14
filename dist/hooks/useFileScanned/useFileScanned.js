"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useFileScanned;
var file_1 = require("@/utils/file");
var react_1 = require("react");
function useFileScanned(file) {
    var _a = (0, react_1.useState)(false), isNotInfected = _a[0], setIsNotInfected = _a[1];
    var _b = (0, react_1.useState)(false), isScanning = _b[0], setIsScanning = _b[1];
    var setFileStatus = function () {
        if ((0, file_1.isFileScanComplete)(file)) {
            setIsScanning(false);
            setIsNotInfected((0, file_1.isFileScanComplete)(file));
        }
        else if ((0, file_1.isFileScanFailed)(file)) {
            setIsScanning(false);
            setIsNotInfected(false);
        }
        else if ((0, file_1.isFileScanning)(file)) {
            setIsScanning(true);
        }
    };
    (0, react_1.useEffect)(function () {
        setFileStatus();
    }, [file === null || file === void 0 ? void 0 : file.status]);
    (0, react_1.useEffect)(function () {
        setFileStatus();
    }, []);
    return { isNotInfected: isNotInfected, isScanning: isScanning };
}
