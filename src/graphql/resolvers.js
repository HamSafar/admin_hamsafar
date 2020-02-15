import { gql } from 'apollo-boost'

export const typeDefs = gql`
    extend type Place {
        id: String
        title: String

    }
    extend type User {
        id: String
        token: String
        isAuth: Boolean
        username: String
        password: String
        name: String
        places: [Place]
    }
    extend type Prefs {
        lang: Int
        theme: Int
        autoLogin: Boolean
    }
    extend type Mutation {
        updatePrefs(prefs: Prefs): Prefs
        updateUser(user: User): User
    }
`
// add isOnline, 

const GET_PREFS = gql`
    {
        prefs @client {
            theme
            lang
            autoLogin
        }
    }
`

const GET_USER = gql`
    {
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
    }
`

export const resolvers = {
    Mutation: {
        updatePrefs: (_root, { prefs: newPrefs }, { cache }) => {
            const { prefs } = cache.readQuery({
                query: GET_PREFS
            })
            cache.writeQuery({
                query: GET_PREFS,
                data: { prefs: { ...prefs, ...newPrefs } }
            })
        },
        updateUser: (_root, { user: newUser }, { cache }) => {
            const { user } = cache.readQuery({
                query: GET_USER
            })
            cache.writeQuery({
                query: GET_USER,
                data: { user: { ...user, ...newUser } }
            })
        }
    }
}