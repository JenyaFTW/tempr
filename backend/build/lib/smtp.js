"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var smtp_server_1 = require("smtp-server");
var mailparser_1 = require("mailparser");
var Email_model_1 = require("../models/Email.model");
var pubsub_1 = require("./pubsub");
var SMTP = /** @class */ (function () {
    function SMTP() {
        this.server = new smtp_server_1.SMTPServer({
            authOptional: true,
            onData: function (stream, session, cb) {
                var _this = this;
                (0, mailparser_1.simpleParser)(stream).then(function (email) { return __awaiter(_this, void 0, void 0, function () {
                    var emailObj;
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                emailObj = new Email_model_1.Email({
                                    subject: email.subject,
                                    messageId: email.messageId,
                                    htmlContent: email.html,
                                    fromName: (_a = email.from) === null || _a === void 0 ? void 0 : _a.value[0].name,
                                    fromAddr: (_b = email.from) === null || _b === void 0 ? void 0 : _b.value[0].address,
                                    toName: email.to.value[0].name,
                                    toAddr: email.to.value[0].address,
                                    received: Math.round(Date.now() / 1000)
                                });
                                return [4 /*yield*/, emailObj.save()];
                            case 1:
                                _c.sent();
                                pubsub_1.pubsub.publish("EMAIL_ADDED_" + email.to.value[0].address, { emailAdded: emailObj });
                                cb();
                                return [2 /*return*/];
                        }
                    });
                }); }, cb);
            }
        });
    }
    SMTP.prototype.startServer = function () {
        var SMTP_PORT = process.env.SMTP_PORT || 25;
        this.server.listen(SMTP_PORT);
        console.log("Started SMTP server on port " + SMTP_PORT);
    };
    return SMTP;
}());
exports.default = SMTP;
