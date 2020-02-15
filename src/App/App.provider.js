import React, { Component } from 'react'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import { ApolloClient } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { gql } from 'apollo-boost'

import { typeDefs, resolvers } from '../graphql/resolvers'

import App from './App.dev'

class AppProvider extends Component {

    state = {
        client: null,
        loading: true
    }

    async componentDidMount() {

        const cache = new InMemoryCache();

        await persistCache({
            cache,
            storage: window.localStorage,
        })

        const httpLink = createHttpLink({
            //uri: 'http://2.184.239.248:3000/graphql/'
            //uri: 'http://192.168.1.104:/graphql/'
            uri: 'http://limoonline.org/graphql/'
        })

        const client = new ApolloClient({
            link: httpLink,
            cache,
            typeDefs,
            resolvers
        })

        // INITIAL_STATE

        try { 
            const { lang } = await client.readQuery({
                query: gql`
                    {
                        lang @client
                    }
                `
            })

            client.writeData({
                data: {
                    lang
                }
            })
        } catch (e) {
            console.log('Welcome to our app')

            // Default Values for First Time
            client.writeData({
                data: {
                    lang: 1,
                    prefs: {}
                }
            })
        }        

        this.setState({
            client,
            loading: false
        })
    }

    render() {
        const { client, loading } = this.state
        if (loading) return <p>Loading...</p>
        return (
            <ApolloProvider client={client} >
                <App />
            </ApolloProvider>
        );
    }
}

export default AppProvider