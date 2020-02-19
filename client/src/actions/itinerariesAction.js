import { REQUEST_ITINERARIES, FETCH_ITINERARIES, FAIL_FETCH_ITINERARIES} from './types';
import axios from 'axios';

export const fetchItineraries = (cityName) => {
    return async function (dispatch) {
        return await axios
        .get(`/api/itineraries/${cityName}`)
        .then(res =>
            dispatch({
                type: FETCH_ITINERARIES,
                itineraries: res.data,
            }))
        .catch(error => {
            dispatch(failFetchItineraries(error.message))
        })
    }
}

export const requestItineraries = () => {
    return {
        type: REQUEST_ITINERARIES,
    }
}

export const failFetchItineraries = (error) => {
    return {
        type: FAIL_FETCH_ITINERARIES,
        error
    }
}