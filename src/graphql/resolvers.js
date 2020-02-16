import { gql } from 'apollo-boost'

export const typeDefs = gql`
    type Mutation {
        updateUser(user: User): User
        updatePrefs(prefs: Prefs): Prefs
        updateStatus(status: String!): String!
    }
    type User {
        id: String
        token: String
        isAuth: Boolean
        username: String
        password: String
        name: String
        places: [Place]
    }
    type Prefs {
        lang: Int
        theme: Int
        autoLogin: Boolean
    }
    type Place {
        id: String
        title: String

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

const GET_STATUS = gql`
    {
        status @client
    }
`

export const resolvers = {
    Mutation: {
        updatePrefs: (_root, { prefs: nextPrefs }, { cache }) => {
            const { prefs: prevPrefs } = cache.readQuery({
                query: GET_PREFS
            })
            const prefs = {...prevPrefs, ...nextPrefs}
            console.log(prefs, _root)
            cache.writeQuery({
                query: GET_PREFS,
                data: { prefs }
            })
            return prefs
        },
        updateUser: (_root, { user: nextUser }, { cache }) => {
            const { user: prevUser } = cache.readQuery({
                query: GET_USER
            })
            const user = {...prevUser, ...nextUser}
            console.log(user, _root)
            cache.writeQuery({
                query: GET_USER,
                data: { user }
            })
            return user
        },
        updateStatus: (_root, { status }, { cache }) => {
            cache.writeQuery({
                query: GET_STATUS,
                data: { status }
            })
        }
    }
}