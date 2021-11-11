"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ImapServer = require('imap-server');
var net_1 = __importDefault(require("net"));
var server = ImapServer();
var plugins = require('imap-server/plugins');
server.use(plugins.announce);
var IMAP_PORT = process.env.IMAP_PORT || 143;
net_1.default.createServer(server).listen(IMAP_PORT);
console.log("Started IMAP server on port " + IMAP_PORT);
