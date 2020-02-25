import React from 'react'
import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'

import AppDev from './App.dev'

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

window.addEventListener('offline', function (e) { console.log('offline'); });
window.addEventListener('online', function (e) { console.log('online'); });

const AppContainer = (props) => (

    <Mutation mutation={UPDATE_USER} >
        {(updateUser, { data: loginData }) => {
            console.log('loginData', loginData)
            const placeData = {
                currentPlace: {
                    index: 0,
                    id: '',
                    title: 'kish',
                    header: 'Kish Island',
                    detail: '',
                    pictures: [
                        {
                            path: 'https://images.unsplash.com/photo-1581357825340-32259110788a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80'
                        }
                    ],
                    tag: { title: 'Tourism' },
                    updated: null
                }
            }
            console.log('auth succeed')
            return (
                <Query query={GET_CURRENT_STATE} >
                    {({ data: stateData }) => {
                        const data = { ...stateData, ...loginData, ...placeData, updateUser }
                        console.log('got current-state')
                        return (
                            <AppDev {...data} />
                        )
                    }}
                </Query >
            )
        }}
    </Mutation>
)

//use SELECTORS in case of no change in data
//or in App shouldComponentUpdate -> if stringify( prevState === nextState ) return false

export default AppContainer;