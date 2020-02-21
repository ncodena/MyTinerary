import {USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    favourites: [],
    user: null
};

export default function(state = initialState, action) {
    switch(action.type){
        case USER_LOADING:
            return {
               ...state,
               isLoading: true,
            };
        case USER_LOADED:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                isAuthenticated: true,
                favourites: action.favourites
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                isAuthenticated: true,
                favourites: action.favourites
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return {
                ...state,
                isLoading: false,
                user: null,
                token: null,
                favourites:[],
                isAuthenticated: false

            };
        default:
            return state
            
    }
}