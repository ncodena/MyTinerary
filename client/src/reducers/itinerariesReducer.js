import {REQUEST_ITINERARIES, FETCH_ITINERARIES, FAIL_FETCH_ITINERARIES} from '../actions/types';

const initialState = {
    itineraries: [],
    loading: false,
    error: ''
}

export default function reducer (state = initialState, action) {
    switch(action.type) {
        case REQUEST_ITINERARIES:
            return {
               ...state,
               loading:true

            }
        case FETCH_ITINERARIES:
            return {
                ...state,
                loading: false,
                itineraries: action.itineraries,

            }
        case FAIL_FETCH_ITINERARIES:
            return {
                ...state,
              loading: false,
              error: action.error

            }
            default:
                return state
    }
}