import { combineReducers } from 'redux';
import authReducer from './authReducer';
import dashboardReducer from './dashboardReducer'
//import formReducer from './authReducer'


const rootReducer = combineReducers({
    auth: authReducer,
    dash: dashboardReducer
})

export default rootReducer;