import { REQUEST_CITIES, FETCH_CITIES, FAIL_FETCH_CITIES } from './types';
import axios from 'axios';

export const fetchCities = () => dispatch => {
    dispatch(requestCities());
    axios
        .get('/api/cities')
        .then(res => 
            dispatch({
                type: FETCH_CITIES,
                cities: res.data,
            }))
            
        .catch(error => {
            dispatch(failFetchCities(error.message))
        })
};

export const requestCities = () => {
    return {
        type: REQUEST_CITIES,
    }
}

export const failFetchCities = (error) => {
    return {
        type: FAIL_FETCH_CITIES,
        error
    }
}