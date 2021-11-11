"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
var mongoose_1 = require("mongoose");
var EmailSchema = new mongoose_1.Schema({
    messageId: {
        type: String,
        required: false
    },
    subject: {
        type: String,
        required: true
    },
    htmlContent: {
        type: String,
        required: true
    },
    fromName: {
        type: String,
        required: false
    },
    fromAddr: {
        type: String,
        required: true
    },
    toName: {
        type: String,
        required: false
    },
    toAddr: {
        type: String,
        required: true
    },
    received: {
        type: Number,
        required: true
    }
});
exports.Email = (0, mongoose_1.model)('email', EmailSchema);
