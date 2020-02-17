import React from 'react';
import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { setContext } from 'apollo-link-context';

import AppDev from './App.dev'
//import App from './App'

// add AutoLogin and 
// AuthCheck (getFirstPlace -> *handleNoPlace) 
// to following resolver

/* 
defaults {
    autoLogin: false,
    username, password: ''
}
*/

/* 
onAppMounted:
    GeneralCheck():
        -> online?  -> autoLogin?   -> commitLogin()    ok-> setProfile(user,pass,token) -> AuthCheck?...
                                                        err-> goto-login-page
                                    -> goto-login-page && TURN-OFF-AUTO-LOGIN
                    -> load-previous-profile && setStatus(offline)
    -> loading-spinner
                            
AuthCheck(): 
    ok-> setProfile() && setFirstPlace()
    err-> GeneralCheck()

LoginPage:
    login(): updates-app-profile -> app-updates -> genral-checks

// if there was err with AuthCheck() -> infinte-loop-problem!?
*/


// GET_PREFS Query Component MUST be child of GET_PROFILE Query Component
// in case of any change in prefs -> don't checkAuth(and getProfile) again...
// notice: checkAuth has online actions while updatePrefs doesn't

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

window.addEventListener('offline', function(e) { console.log('offline'); });
window.addEventListener('online', function(e) { console.log('online'); });

const App = process.env.NODE_ENV === 'development'
    ? AppDev
    : AppDev

const AppContainer = (props) => (
    <Query query={GET_CURRENT_STATE} >
        {({ data: stateData }) => {
            console.log('got current-state')
            return (
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
                                                console.log('auth succeed')
                                                const data = { ...stateData, ...loginData, ...placeData }
                                                return (
                                                    <App {...data}
                                                        commitLogin={commitLogin}
                                                        getPlace={getPlace}
                                                    />
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
        }}
    </Query>
)

//use SELECTORS in case of no change in data
//or in App shouldComponentUpdate -> if stringify( prevState === nextState ) return false

export default AppContainer;