import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-boost' 

const httpLink = createHttpLink({
    uri: 'http://2.184.239.248:3000/graphql/'
})

var client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

export { httpLink };
export default client;