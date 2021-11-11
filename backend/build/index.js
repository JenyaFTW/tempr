"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var smtp_1 = __importDefault(require("./lib/smtp"));
dotenv_1.default.config({ path: __dirname + '../../../.env' });
var smtp = new smtp_1.default;
require('./lib/mongoose');
require('./app');
smtp.startServer();
