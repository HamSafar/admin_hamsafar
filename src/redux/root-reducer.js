import { combineReducers } from 'redux'

//// reducers
import account from './account/account.reducer'

const rootReducer = combineReducers({
    account
})

export default rootReducer 