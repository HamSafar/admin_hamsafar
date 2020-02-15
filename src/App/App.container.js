import React from 'react';
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

import AppDev from './App.dev'
//import App from './App'

const GET_PREFS = gql`
    {
        prefs @client {
            theme
            lang
            autoLogin
        }
    }
`

const AppContainer = (props) => (
    <Query query={GET_PREFS} >
        {({ data: { prefs } }) => (
            process.env.NODE_ENV === 'development' ?
                <AppDev {...props} prefs={prefs} /> :
                <AppDev {...props} prefs={prefs} />
        )}
    </Query>
)

export default AppContainer;