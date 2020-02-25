import { REQUEST_COMMENTS, FETCH_COMMENTS, FAILURE_FETCHING_COMMENTS, GET_USER } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    loading: false,
    comments: [],
    error: '',
    user: {}
};

export default function reducer (state = initialState, action){
    switch(action.type){
        case REQUEST_COMMENTS:
            return {
                ...state,
                loading: true
            }
        case FETCH_COMMENTS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                loading: false,
                comments: action.comments,
            }
        case GET_USER:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                user: action.user
            }
        case FAILURE_FETCHING_COMMENTS:
            return {
                ...state,
                loading: false,
                error: action.error
            }
            default:
                return state
    }

}