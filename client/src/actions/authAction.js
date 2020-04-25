import { AUTH_SIGN_UP, AUTH_SIGN_IN, AUTH_ERROR, AUTH_SIGN_OUT, DASHBOARD_GET_DATA, DASHBOARD_GET_EVENTS } from './types';
import axios from 'axios';


export const signOut = () => {
    return dispatch => {
        localStorage.removeItem('JWT_TOKEN');
        dispatch({
            type: AUTH_SIGN_OUT,
            payload: ''
        })


    }
}



export const getDashboard = () => {
    return async dispatch => {
        try {
            console.log('In getdashboad result');
            const token = localStorage.getItem('jwtToken');
            console.log('token is ', token)
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
            console.log('we got into error in dashboard');
            console.error('err', err);
        }
    }
}


export const checkAuth = () => {
    console.log('In authAction In checkAuth');
    return async dispatch => {
        try {
            const token = localStorage.getItem('JWT_TOKEN');
            console.log('token is ', token)
            if (token) {
                await axios.get('/users/status', {
                    headers: {
                        'Authorization': `${token}`
                    }
                });

                dispatch({
                    type: AUTH_SIGN_IN
                });
                console.log('user is authenticated');
            } else console.log('User is not authenticated');



        } catch (err) {
            console.log('Error  User is not authenticated')
            console.log('error', err)
        }
    };
}



export const oauthGoogle = data => {
    return async dispatch => {
        try {
            const res = await axios.post('/users/oauth/google', {
                access_token: data
            });
            localStorage.setItem('JWT_TOKEN', res.data.token);
            let tmp = {};
            tmp.jwtToken = res.data.token;
            tmp.accessToken = data;
            dispatch({
                type: AUTH_SIGN_UP,
                payload: tmp
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
    console.log('in getEvents authaction')
    console.log('events recived are ', events)
    return async dispatch => {
        dispatch({
            type: DASHBOARD_GET_EVENTS,
            payload: events
        });
    }
}