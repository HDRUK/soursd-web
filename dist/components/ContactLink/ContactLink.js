"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var contacts_1 = require("@/config/contacts");
function ContactLink(_a) {
    var children = _a.children;
    return ((0, jsx_runtime_1.jsx)("a", { href: "mailto:".concat(contacts_1.CONTACT_MAIL_ADDRESS), children: children || contacts_1.CONTACT_MAIL_ADDRESS }));
}
exports.default = ContactLink;
