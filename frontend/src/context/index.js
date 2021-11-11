import { createContext, useEffect, useState } from "react";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { ApolloProvider } from 'react-apollo';
import { get, set } from "js-cookie";

export const Context = createContext();

export const Provider = (props) => {
    const apolloClient = new ApolloClient({
        uri: '/graphql',
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