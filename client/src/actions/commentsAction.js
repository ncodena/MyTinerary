import { REQUEST_COMMENTS, FETCH_COMMENTS, FAILURE_FETCHING_COMMENTS } from './types';
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
                dispatch({
                    type: FAILURE_FETCHING_COMMENTS,
                    error: err.data
                })
            })

    }
};