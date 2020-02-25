import {combineReducers} from 'redux';
import citiesReducer from './citiesReducer';
import itinerariesReducer from './itinerariesReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import commentsReducer from './commentsReducer';

export default combineReducers ({
    cities: citiesReducer,
    itineraries: itinerariesReducer,
    auth: authReducer,
    error: errorReducer,
    comments: commentsReducer,
})