"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQL = void 0;
var express_graphql_1 = require("express-graphql");
var graphql_1 = require("graphql");
var Email_1 = require("../schemas/typedefs/Email");
var GraphQL = /** @class */ (function () {
    function GraphQL() {
        this.RootQuery = this.initRootQuery();
        this.Schema = new graphql_1.GraphQLSchema({ query: this.RootQuery });
    }
    GraphQL.prototype.initRootQuery = function () {
        var emails = [];
        return new graphql_1.GraphQLObjectType({
            name: 'RootQueryType',
            fields: {
                getEmails: {
                    type: new graphql_1.GraphQLList(Email_1.EmailType),
                    args: { toAddr: { type: graphql_1.GraphQLString } },
                    resolve: function (parent, args) {
                        return emails.filter(function (el) { return el.toAddr === args.toAddr; });
                    }
                }
            }
        });
    };
    GraphQL.prototype.expressMiddleware = function () {
        return (0, express_graphql_1.graphqlHTTP)({ schema: this.Schema, graphiql: true });
    };
    return GraphQL;
}());
exports.GraphQL = GraphQL;
