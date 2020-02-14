import React from 'react'
import { Query } from 'react-apollo'

import AccountActionTypes from './account.types'
import GET_PROFILE from './account.gql'

export const fetchAccountStart = () => ({
    type: AccountActionTypes.FETCH_ACCOUNT_START
})

export const fetchAccountSuccess = data => ({
    type: AccountActionTypes.FETCH_ACCOUNT_SUCCESS,
    payload: data
})

export const fetchAccountFailure = error => ({
    type: AccountActionTypes.FETCH_ACCOUNT_FAILURE,
    payload: error
})

export const fetchAccount = ({ variables }) => {
    return dispatch => (
        <Query query={GET_PROFILE} variables={variables}>
            {({ loading, error, data }) => { 
                if(loading) return dispatch(fetchAccountStart(loading))
                if(error) return dispatch(fetchAccountFailure(error))
                return dispatch(fetchAccountSuccess(data))
            }}
        </Query>
    )
}