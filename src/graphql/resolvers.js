import { gql } from 'apollo-boost'

export const typeDefs = gql`
    type Mutation {
        updateUser(user: User): User
        updatePrefs(prefs: Prefs): Prefs
        updateStatus(status: String!): String!
        updateCurrentPlace(place: Place): Place
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
        index: Int
        id: String!
        title: String!
        header: String
        detail: Stirng
        pictures: [String]
        tagTitle: String
        updated: String
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

const GET_CURRENT_PLACE = gql`
    {
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
    }
`

const GET_STATUS = gql`
    {
        status @client
    }
`

export const resolvers = {
    Mutation: {
        updatePrefs: (_, { prefs: nextPrefs }, { cache }) => {
            const { prefs: prevPrefs } = cache.readQuery({
                query: GET_PREFS
            })
            const prefs = {...prevPrefs, ...nextPrefs}
            console.log(prefs, _)
            cache.writeQuery({
                query: GET_PREFS,
                data: { prefs }
            })
            return prefs
        },
        updateUser: (_, { user: nextUser }, { cache }) => {
            const { user: prevUser } = cache.readQuery({
                query: GET_USER
            })
            const user = {...prevUser, ...nextUser}
            console.log(nextUser, _)
            cache.writeQuery({
                query: GET_USER,
                data: { user }
            })
            return user
        },
        updateCurrentPlace: (_, { place: nextPlace }, { cache }) => {
            const { currentPlace: prevPlace } = cache.readQuery({
                query: GET_CURRENT_PLACE
            })
            const currentPlace = {...prevPlace, ...nextPlace}
            console.log(currentPlace, _)
            cache.writeQuery({
                query: GET_CURRENT_PLACE,
                data: { currentPlace }
            })
            return currentPlace
        },
        updateStatus: (_, { status }, { cache }) => {
            cache.writeQuery({
                query: GET_STATUS,
                data: { status }
            })
            return status
        }
    }
}