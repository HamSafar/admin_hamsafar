import AccountActionTypes from "./account.types"

const INITIAL_STATE = {
    account: null,
    isFetching: false,
    error: undefined,
}

export default function(state = INITIAL_STATE, action) {
    
    switch(action.type) {
        case AccountActionTypes.FETCH_ACCOUNT_START: 
            return {
                ...state, 
                isFetching: true
            }
        case AccountActionTypes.FETCH_ACCOUNT_SUCCESS:
            return {
                ...state, 
                account: action.payload
            }
        case AccountActionTypes.FETCH_ACCOUNT_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
        default: 
            return state
    }
} 