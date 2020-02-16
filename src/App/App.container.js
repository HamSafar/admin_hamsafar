import React from 'react';
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

import AppDev from './App.dev'
//import App from './App'

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
        status @client
    }
`
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


const AppContainer = (props) => {
    return <Query query={GET_CURRENT_STATE} >
        {({ data }) => {
            process.env.NODE_ENV === 'development' && console.log('AppContainer Rendered')
            return process.env.NODE_ENV === 'development' ?
                <AppDev {...props} {...data} /> :
                <AppDev {...props} {...data} />
        }}
    </Query>
}

//use SELECTORS in case of no change in data
//or in App shouldComponentUpdate -> if stringify( prevState === nextState ) return false

export default AppContainer;