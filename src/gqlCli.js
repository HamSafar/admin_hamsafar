import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import { ApolloClient } from 'apollo-boost' 

const httpLink = createHttpLink({
    //uri: 'http://2.184.239.248:3000/graphql/'
    //uri: 'http://192.168.1.104:/graphql/'
    uri: 'http://limoonline.org/graphql/'
})

const cache = new InMemoryCache()

persistCache({
    cache,
    storage: window.localStorage,
})

var client = new ApolloClient({
    link: httpLink,
    cache
})

export { httpLink };
export default client;