import { createContext, useEffect, useState } from "react";
import { ApolloClient, ApolloLink, InMemoryCache, gql, split, useQuery } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from "@apollo/client/utilities";
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from "apollo-link-http";
import { get, set } from "js-cookie";

export const Context = createContext();

export const Provider = (props) => {
    const apolloClient = new ApolloClient({
        uri: 'http://192.168.0.102:3001/graphql',
        cache: new InMemoryCache()
    });

    const [email, setEmail] = useState('Generating...');
    const [emails, setEmails] = useState([]);

    let savedEmail = get("tempr_email");

    useEffect(() => {
        if (savedEmail) {
            setEmail(savedEmail);
            fetchEmails(savedEmail);
        } else {
            newEmail();
        }
    }, []);

    const fetchEmails = (email) => {
        apolloClient.query({
            query: gql`
                query {
                    getEmails(toAddr: "${email}") {
                        subject
                        htmlContent
                        messageId
                        fromAddr
                        fromName
                        toAddr
                        toName
                        received
                    }
                }
            `
        }).then(result => setEmails(result.data.getEmails));
    };

    const newEmail = () => {
        setEmail('Generating...')

        apolloClient.query({
            query: gql`
                query {
                    getRandomEmail
                }
            `
        }).then(result => {
            setEmail(result.data.getRandomEmail);
            set("tempr_email", result.data.getRandomEmail);
            fetchEmails(result.data.getRandomEmail);
        });
    };

    return (
        <Context.Provider value={{
            emails,
            email,
            newEmail
        }}>
            <ApolloProvider client={apolloClient}>
                {props.children}
            </ApolloProvider>
        </Context.Provider>
    )
};