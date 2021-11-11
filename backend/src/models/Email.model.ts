import { Schema, model } from "mongoose";

const EmailSchema = new Schema({
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

export const Email = model('email', EmailSchema);