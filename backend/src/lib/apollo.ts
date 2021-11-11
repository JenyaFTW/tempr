import { ApolloServer, ServerRegistration } from 'apollo-server-express';
import typeDefs from '../typedefs';
import resolvers from '../resolvers';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

export const apolloInit = async (data: any) => {
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
    });

    const apolloServer = new ApolloServer({
        schema,
        plugins: [{
            async serverWillStart() {
                return {
                    async drainServer() {
                        subscriptionServer.close();
                    }
                }
            }
        }]
    });

    const subscriptionServer = SubscriptionServer.create({
        schema,
        execute,
        subscribe,
        async onConnect(
            connectionParams: Object,
            webSocket: any,
            context: any
        ) {}
        }, {
            server: data.httpServer,
            path: apolloServer.graphqlPath,
        }
    );

    await apolloServer.start();

    apolloServer.applyMiddleware({ app: data.app, path: '/graphql' });

    return apolloServer;
};