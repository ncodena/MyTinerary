import {USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL} from './types';

import {returnErrors} from './errorAction';

import axios from 'axios';

// Check token & load user

export const loadUser = () => (dispatch, getState) => {

    // User loading
    dispatch({type: USER_LOADING});


    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            currentUser: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        })
};

// Setup config/headers and token

export const tokenConfig = getState => {

    // Get token from local storage

    const token = getState().auth.token;

    // Headers

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }

    // If token, add to headers

    if(token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}
