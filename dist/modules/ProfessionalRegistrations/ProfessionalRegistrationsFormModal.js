"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProfessionalRegistrationsFormModal;
var jsx_runtime_1 = require("react/jsx-runtime");
var FormModal_1 = __importDefault(require("../components/FormModal"));
var ProfessionalRegistrationsForm_1 = __importDefault(require("../ProfessionalRegistrationsForm"));
function ProfessionalRegistrationsFormModal(_a) {
    var open = _a.open, onSubmit = _a.onSubmit, onClose = _a.onClose, queryState = _a.queryState, initialValues = _a.initialValues, isEdit = _a.isEdit;
    return ((0, jsx_runtime_1.jsx)(FormModal_1.default, { open: open, heading: isEdit
            ? "Edit Professional Registration"
            : "Add Professional Registration", children: (0, jsx_runtime_1.jsx)(ProfessionalRegistrationsForm_1.default, { onClose: onClose, onSubmit: onSubmit, queryState: queryState, data: initialValues, isEdit: isEdit }) }));
}
