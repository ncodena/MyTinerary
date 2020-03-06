import { REQUEST_COMMENTS, FETCH_COMMENTS, FAILURE_FETCHING_COMMENTS, GET_USER, CREATE_COMMENT, FAILURE_CREATE_COMMENT, DELETE_COMMENT} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    loading: false,
    comments: [],
    error: '',
    user: {},
    comment: {}
};

export default function reducer (state = initialState, action){
    console.log("from redicer", action, FETCH_COMMENTS, FETCH_COMMENTS == action.type)
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
                ...action.payload,
                loading: false,
                comments: action.payload,
            }
        case GET_USER:
            // localStorage.setItem('token', action.payload.token)
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

        case CREATE_COMMENT:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                loading: false,
                comment: action.payload
            }   
        case FAILURE_CREATE_COMMENT:
            return {
                ...state,
                loading: false,
                comment: null,
                error: action.error
            }
        case DELETE_COMMENT:
            localStorage.setItem('token', action.payload.token)
            return{
                ...state,
                comments: state.comments.filter(comment => comment.id !== action.payload)
            }
            default:
                return state
    }

}