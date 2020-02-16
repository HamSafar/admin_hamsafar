import React from 'react'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'

import Login from './login'

//User!
const UPDATE_USER = gql`
    mutation UpdateUser($user: User) {
        updateUser(user: $user) @client {
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

const LoginContainer = (props) => (
    <Mutation mutation={UPDATE_USER} >
        {updateUser =>
            <Login
                strings={props.strings}
                prefs={props.prefs}
                updateUser={user => {
                    updateUser({ variables: { user } })
                }}
            />
        }
    </Mutation>
)

export default LoginContainer