import { REQUEST_CITIES, FETCH_CITIES, FAIL_FETCH_CITIES, FETCH_CITY } from './types';
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

export const fetchCity = (name) => {
    return async function (dispatch) {
        dispatch(requestCities());
        return await axios
        .get(`/api/cities/${name}`)
        .then(res => 
            dispatch({
                type: FETCH_CITY,
                city: res.data,
            }))
        .catch(err => console.error(err)) 
    }
    
}

// export const fetchCity = (city) => {

//     return {
//         type: FETCH_CITY,
//         city
//     }
// }

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