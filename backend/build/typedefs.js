"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var typeDefs = (0, apollo_server_express_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    type Email {\n        messageId: String\n        fromName: String\n        fromAddr: String\n        toName: String\n        toAddr: String\n        subject: String\n        htmlContent: String\n        received: Int\n    }\n\n    type Query {\n        getEmails(toAddr: String): [Email]\n        getRandomEmail: String\n    }\n\n    type Subscription {\n        emailAdded(toAddr: String): Email\n    }\n"], ["\n    type Email {\n        messageId: String\n        fromName: String\n        fromAddr: String\n        toName: String\n        toAddr: String\n        subject: String\n        htmlContent: String\n        received: Int\n    }\n\n    type Query {\n        getEmails(toAddr: String): [Email]\n        getRandomEmail: String\n    }\n\n    type Subscription {\n        emailAdded(toAddr: String): Email\n    }\n"])));
exports.default = typeDefs;
var templateObject_1;
