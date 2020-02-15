import React, { Component } from 'react'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import { ApolloClient } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { gql } from 'apollo-boost'

import { typeDefs, resolvers } from '../graphql/resolvers'

import AppContainer from './App.container'

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
            const GET_PREFS = gql`
                {
                    prefs @client {
                        theme
                        lang
                        autoLogin
                    }
                }
            `

            const { prefs } = await client.readQuery({
                query: GET_PREFS
            })

            console.log(prefs)

            client.writeData({
                data: {
                    prefs
                }
            })
        } catch (e) {
            console.log('Welcome to our app')

            // Default Values for First Time
            client.writeData({
                data: {
                    prefs: {
                        lang: 1,
                        theme: 1,
                        autoLogin: false,
                        __typename: 'Prefs'
                    }
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
                <AppContainer />
            </ApolloProvider>
        );
    }
}

export default AppProvider