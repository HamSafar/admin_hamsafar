export default function(state = {}, action) {
    
    switch(action.type) {
        case 'SETTINGS': 
            return {...state, settings: action.payload}
        default:
            return state
    }
} 