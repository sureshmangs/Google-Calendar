import { AUTH_SIGN_UP, AUTH_SIGN_IN, AUTH_ERROR, AUTH_SIGN_OUT, DASHBOARD_GET_DATA, DASHBOARD_GET_EVENTS } from './types';
import axios from 'axios';


export const signOut = () => {
    return dispatch => {
        localStorage.clear();
        dispatch({
            type: AUTH_SIGN_OUT,
            payload: ''
        })
    }
}



export const getDashboard = () => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('jwtToken');
            const res = await axios.get('/users/dashboard', {
                headers: {
                    'Authorization': `${token}`
                }
            });

            dispatch({
                type: DASHBOARD_GET_DATA,
                payload: res.data
            })

        } catch (err) {
            //console.error('err', err);
        }
    }
}



export const checkAuth = () => {
    return async dispatch => {
        try {
            const token = localStorage.getItem('JWT_TOKEN');
            if (token) {
                await axios.get('/users/status', {
                    headers: {
                        'Authorization': `${token}`
                    }
                });

                dispatch({
                    type: AUTH_SIGN_IN
                });
            } else {
                //console.log('User is not authenticated');
            }

        } catch (err) {
            //console.log('error', err)
        }
    };
}



export const oauthGoogle = data => {
    return async dispatch => {
        try {
            const res = await axios.post('/users/oauth/google', {
                access_token: data
            });
            localStorage.setItem('GTOKEN', data);
            localStorage.setItem('JWT_TOKEN', res.data.token);
            dispatch({
                type: AUTH_SIGN_UP,
                payload: { "jwtToken": res.data.token, "accessToken": data }
            });

        } catch (err) {
            dispatch({
                type: AUTH_ERROR,
                payload: "A problem has occured in SignUp"
            });
        }
    };
}



export const getEvents = (events) => {
    return async dispatch => {
        dispatch({
            type: DASHBOARD_GET_EVENTS,
            payload: events
        });
    }
}