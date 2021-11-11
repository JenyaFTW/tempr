import { Email } from "./models/Email.model";
import { pubsub } from "./lib/pubsub";

const random_name = require('node-random-name');

const resolvers = {
    Query: {
        getEmails: async (parent: any, args: any) => {
            const { toAddr } = args;
            return await Email.find({ 'toAddr': toAddr });
        },
        getRandomEmail: () => {
            const name = random_name().toLowerCase().split(' ').join('.');
            return `${name}@${process.env.DOMAIN}`;
        }
    },
    Subscription: {
        emailAdded: {
            subscribe: (_: any, args: any) => {
                return pubsub.asyncIterator(`EMAIL_ADDED_${args.toAddr}`);
            },
        }
    }
}

export default resolvers;