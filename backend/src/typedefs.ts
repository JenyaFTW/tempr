import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type Email {
        messageId: String
        fromName: String
        fromAddr: String
        toName: String
        toAddr: String
        subject: String
        htmlContent: String
        received: Int
    }

    type Query {
        getEmails(toAddr: String): [Email]
        getRandomEmail: String
    }

    type Subscription {
        emailAdded(toAddr: String): Email
    }
`;

export default typeDefs;