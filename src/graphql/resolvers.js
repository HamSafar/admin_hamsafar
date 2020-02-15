import { gql } from 'apollo-boost'

export const typeDefs = gql`
    extend type Prefs {
        lang: Int
        theme: Int
        autoLogin: Boolean
    }
    extend type Mutation {
        updatePrefs(prefs: Prefs!): Prefs
    }
`

const GET_PREFS = gql`
    {
        prefs @client {
            theme
            lang
            autoLogin
        }
    }
`

export const resolvers = {
    Mutation: {
        updatePrefs: (_root, { prefs: newPrefs }, { cache }) => {

            /* const { prefs } = cache.readQuery({
                query: GET_PREFS
            }) */
            
            cache.writeQuery({
                query: GET_PREFS,
                data: { prefs: newPrefs }
            })
        }
    }
}