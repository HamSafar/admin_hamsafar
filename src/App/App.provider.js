import React, { Component } from 'react'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import { ApolloClient } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { gql } from 'apollo-boost'

import { typeDefs, resolvers } from '../graphql/resolvers'

import Loading from './Components/Loading/Loading'
import AppContainer from './App.container'

class AppProvider extends Component {

    state = {
        client: null,
        httpLink: null,
        loading: true
    }

    async componentDidMount() {

        const cache = new InMemoryCache({
            //dataIdFromObject: object => object.id
        });

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

        const GET_INIT_STATE = gql`
            {
                prefs @client {
                    theme
                    lang
                    autoLogin
                }
                user @client {
                    id
                    token
                    isAuth
                    username
                    password
                    name
                    places {
                        id
                        title
                    }
                }
                currentPlace @client {
                    index
                    id
                    title
                    header
                    detail
                    pictures
                    tagTitle
                    updated
                }
                status
            }
        `

        try {

            const data = await client.readQuery({
                query: GET_INIT_STATE
            })
            console.log(data)
            client.writeData({ data })

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
                    },
                    user: {
                        id: '',
                        token: '',
                        isAuth: false,
                        username: '',
                        password: '',
                        name: '',
                        places: [
                            {
                                id: '',
                                title: '',
                                __typename: 'Place'
                            }
                        ],
                        __typename: 'User'
                    },
                    currentPlace: {
                        index: 0,
                        id: '',
                        title: '',
                        header: '',
                        detail: '',
                        pictures: [],
                        tagTitle: '',
                        updated: '',
                        __typename: 'Place'
                    },
                    status: 'ONLINE'
                }
            })
        }

        this.setState({
            client,
            httpLink,
            loading: false
        })
    }

    render() {
        const { client, httpLink, loading } = this.state
        if (loading) return <Loading />
        return (
            <ApolloProvider client={client} >
                <AppContainer 
                    client={client} 
                    httpLink={httpLink} 
                />
            </ApolloProvider>
        );
    }
}

export default AppProvider