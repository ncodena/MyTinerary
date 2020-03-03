import { REQUEST_COMMENTS, FETCH_COMMENTS, FAILURE_FETCHING_COMMENTS, CREATE_COMMENT, FAILURE_CREATE_COMMENT } from './types';
import {returnErrors} from './errorAction';
import axios from 'axios';

// SETUP CONFIG/HEADERS AND TOKEN

export const tokenConfig = getState => {

    // Get token from local storage

    const token = getState().auth.token;

    // Headers

    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    // If token, add to headers

    if(token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}


// ACTION TO FETCH COMMENTS

export const fetchComments = (itinerary) => {

    console.log("about get comments from the backend with fetch", itinerary)

        return function (dispatch, getState) {

            dispatch({type: REQUEST_COMMENTS})

            axios
                .get(`/api/auth/${itinerary}/comments`, tokenConfig(getState))
                .then(res => {
                    console.log(res);
                         
                        return dispatch({
                            type: FETCH_COMMENTS,
                            payload: res.data,
                            
                        })
                     } )
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status, 'FAILURE_FETCHING_COMMENTS'));
                dispatch({
                    type: FAILURE_FETCHING_COMMENTS,
                    error: err.data
                })
            })

    }
};

// ACTION TO POST A NEW COMMENT

export const postComment = (newComment) => async(dispatch, getState) => {

    console.log("about to send the new comment to the backend with fetch", newComment)

    // Request body

    const body = JSON.stringify(newComment);

    // Post request to API

    return await axios.post('/api/auth/itinerary/comments', body, tokenConfig(getState))

        .then(res => dispatch({
            type: CREATE_COMMENT,
            payload: res.data
        }))

        .catch(err => {
            dispatch({
                type: FAILURE_CREATE_COMMENT
            })
        })
}