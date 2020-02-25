import React from 'react';
import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { setContext } from 'apollo-link-context';

import App from './App'

const GET_CURRENT_STATE = gql`
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
        status @client
    }
`


const UPDATE_USER = gql`
    #client
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
const COMMIT_LOGIN = gql`
    #online
    mutation CommitLogin($username: String, $password: String) {
        #login data
        id
    }
`

const GET_PLACE = gql`
    #online
    query GetPlace($adminId: String, $index: Int) {
        #place data
        offset
    }
`

window.addEventListener('offline', function (e) { console.log('offline'); });
window.addEventListener('online', function (e) { console.log('online'); });

/******************* 
REMOVE the query GET_CURRENT_STATE from AppContainer
ADD the mutation UPDATE_CURRENT_STATE to App component
this will protect AppContainer from rerendering
and when a new set of props received by App it will rerender
(don't forget to define App as a PureComponent to prevent infinite rerendering)
Now App holds it's own state instead of having AppContainer does it
NOTICE: DO THE SAME FOR APP.CONTAINER.JS
********************/

const AppContainer = (props) => (
    
    <Mutation mutation={UPDATE_USER} >
        {(updateUser) => {
            console.log('got new-user')
            return (
                <Mutation mutation={COMMIT_LOGIN} >
                    {(commitLogin, { data: loginData, error: loginError }) => {
                        if (loginError) {
                            console.log('login failed')
                            return updateUser({ variables: { isAuth: false } })
                            // consequently goes to login-page
                        }
                        ///////// updateUser@client with received data
                        console.log('login succeed, setting token')
                        //Add Token to Request
                        const { client, httpLink } = this.props
                        const token = loginData.token
                        const authLink = setContext((_, { headers }) => {
                            return {
                                headers: {
                                    ...headers,
                                    authorization: token ? `Bearer ${token}` : "",
                                }
                            }
                        });
                        client.link = authLink.concat(httpLink);
                        return (
                            <Mutation mutation={GET_PLACE} >
                                {(getPlace, { data: placeData, error: authError }) => {
                                    if (authError) {
                                        console.log('auth failed, commiting login')
                                        const { username, password } = loginData
                                        return commitLogin({ variables: { username, password } })
                                        // consequently if fails -> loginError -> login-page
                                    }
                                    ///////// updatePrefs@client with received data
                                    console.log('auth succeed')
                                    return (
                                        <Query query={GET_CURRENT_STATE} >
                                            {({ data: stateData }) => {
                                                console.log('got current-state')
                                                const data = { ...stateData, ...loginData, ...placeData }
                                                return (
                                                    <App {...data}
                                                        commitLogin={commitLogin}
                                                        getPlace={getPlace}
                                                    />
                                                )
                                            }}
                                        </Query>
                                    )
                                }}
                            </Mutation>
                        )
                    }}
                </Mutation>
            )
        }}
    </Mutation>
)

export default AppContainer;