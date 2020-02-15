import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import { ApolloClient } from 'apollo-boost'

import { typeDefs, resolvers } from './graphql/resolvers'

const httpLink = createHttpLink({
    //uri: 'http://2.184.239.248:3000/graphql/'
    //uri: 'http://192.168.1.104:/graphql/'
    uri: 'http://limoonline.org/graphql/'
})

const cache = new InMemoryCache();

persistCache({
    cache,
    storage: window.localStorage,
})

const client = new ApolloClient({
    link: httpLink,
    cache,
    typeDefs,
    resolvers
})

// INITIAL_STATE
client.writeData({
    data: {
        lang: 1
    }
})

export { httpLink };
export default client;