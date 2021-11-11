"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailType = void 0;
var graphql_1 = require("graphql");
var EmailType = new graphql_1.GraphQLObjectType({
    name: 'Email',
    fields: function () { return ({
        messageId: { type: graphql_1.GraphQLString },
        fromName: { type: graphql_1.GraphQLString },
        fromAddr: { type: graphql_1.GraphQLString },
        toName: { type: graphql_1.GraphQLString },
        toAddr: { type: graphql_1.GraphQLString },
        subject: { type: graphql_1.GraphQLString },
        htmlContent: { type: graphql_1.GraphQLString },
        date: { type: graphql_1.GraphQLInt }
    }); }
});
exports.EmailType = EmailType;
