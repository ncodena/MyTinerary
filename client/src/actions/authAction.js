import {USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL} from './types';

import {returnErrors} from './errorAction';

import axios from 'axios';


// SETUP CONFIG/HEADERS AND TOKEN

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


// ACTION TO GET USER

export const loadUser = () => (dispatch, getState) => {

    // User loading
    dispatch({type: USER_LOADING});

    // Get request to api


    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        })
};


// ACTION TO REGISTER USER

export const register = ({firstName, lastName, userName, password, email, country}) => dispatch => {

    // Headers

    const config = {
        headers: {
            'Content-Type': 'application/json',
            "Accept": 'application/json'
        }
    }

    // Request body
    const body = JSON.stringify({firstName, lastName, userName, password, email, country});

    // Post request to api

    axios.post('/api/users/register', body, config)

    
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))

        
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));

            dispatch({
                type: REGISTER_FAIL
            })
        })
        
}

// ACTION TO LOGIN USER

export const login = ({email, password}) => dispatch => {

    // Headers

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }

    // Request body

    const body = JSON.stringify({email, password})

    // Post request to api

    axios.post('/api/auth/login', body, config)
    
        .then(res => { 
            console.log('res line 117', res)
            dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })}
        )

        
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));

            dispatch({
                type: LOGIN_FAIL
            })
        })
        
}


// ACTION TO LOGOUT USER

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
};