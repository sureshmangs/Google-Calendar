import { DASHBOARD_GET_EVENTS } from '../actions/types';


const DEFAULT_STATE = {
    events: []
}

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case DASHBOARD_GET_EVENTS:
            return {
                ...state,
                events: action.payload
            }
        default:
            { return state }
    }
}