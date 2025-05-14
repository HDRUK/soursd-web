"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useFormFromConfig;
var react_1 = require("react");
var yup_1 = require("@/utils/yup");
var react_hook_form_1 = require("react-hook-form");
var yup_2 = require("@hookform/resolvers/yup");
function useFormFromConfig(formFieldsConfig) {
    var schema = (0, react_1.useMemo)(function () { return (0, yup_1.generateSchema)(formFieldsConfig); }, [formFieldsConfig]);
    return (0, react_hook_form_1.useForm)({
        resolver: (0, yup_2.yupResolver)(schema),
        defaultValues: (0, yup_1.generateDefaultValues)(formFieldsConfig),
    });
}
