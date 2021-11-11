"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dotenvInit = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var dotenvInit = function () {
    var result = dotenv_1.default.config();
    if (result.error) {
        throw result.error;
    }
};
exports.dotenvInit = dotenvInit;
