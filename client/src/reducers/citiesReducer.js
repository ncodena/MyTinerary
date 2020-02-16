import { REQUEST_CITIES, FETCH_CITIES, FAIL_FETCH_CITIES } from '../actions/types';

const initialState = {
    cities: [],
    loading: false,
    error: ''
}

export default function( state = initialState, actions){
    switch(actions.type) {
        case REQUEST_CITIES:
            return {
                ...state,
                loading: true,
            }
        case FETCH_CITIES: 
            return {
                ...state,
                loading: false,
                cities: actions.cities,
            }
        case FAIL_FETCH_CITIES:
            return {
                ...state,
                loading: false,
                error: actions.error
            }
            default:
                return state;
    }

};