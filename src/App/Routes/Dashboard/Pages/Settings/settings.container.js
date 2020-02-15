import React from 'react'
import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'

import Settings from './settings'

const GET_LANG = gql`
    {
        lang @client
    }
`

const TOGGLE_LANG = gql`
    mutation ToggleLang {
        toggleLang @client
    }
`

const SettingsContainer = (props) => (
    <Query query={GET_LANG} >
        {({ data: { lang } }) => (
            <Mutation mutation={TOGGLE_LANG}>
                { toggleLang => <Settings {...props} lang={lang} toggleLang={toggleLang} /> }
            </Mutation>
        )}
    </Query>
)

export default SettingsContainer