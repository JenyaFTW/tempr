"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressInit = void 0;
var express_1 = __importDefault(require("express"));
var expressInit = function (port, cb) {
    var app = (0, express_1.default)();
    app.listen(port, cb);
    return app;
};
exports.expressInit = expressInit;
