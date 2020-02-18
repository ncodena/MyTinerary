import { REQUEST_CITIES, FETCH_CITIES, FAIL_FETCH_CITIES, FETCH_CITY } from '../actions/types';

const initialState = {
    cities: [],
    city: {},
    loading: false,
    error: ''
}

export default function( state = initialState, action){
    switch(action.type) {
        case REQUEST_CITIES:
            return {
                ...state,
                loading: true,
            }
        case FETCH_CITIES: 
            return {
                ...state,
                loading: false,
                cities: action.cities,
            }
        case FAIL_FETCH_CITIES:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case FETCH_CITY:
            return {
                ...state,
                loading: false,
                city: action.city
            }
            default:
                return state;
    }

};