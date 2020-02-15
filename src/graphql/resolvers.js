import { gql } from 'apollo-boost'

export const typeDefs = gql`
    extend type Mutation {
        Lang: Int!
    }
`

const GET_LANG = gql`
    {
        lang @client
    }
`

export const resolvers = {
    Mutation: {
        toggleLang: (_root, _args, { cache }) => {
            const { lang } = cache.readQuery({
                query: GET_LANG,
            })

            cache.writeQuery({
                query: GET_LANG,
                data: { lang: (lang ? 0 : 1) }
            })
        }
    }
}