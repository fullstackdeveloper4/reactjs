import * as types from '../ActionTypes/actionTypes';
// import axios from 'axios'

export function setTotalQuoteAnount(data){
    return {
        type: types.SET_TOTAL_QUOTE_COST,
        payload: data,
    };
}
