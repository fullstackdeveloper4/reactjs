import * as types from '../ActionTypes/actionTypes';

export function setQuoteDetails(data){
    return {
        type: types.SET_QUOTE_DETAIL,
        payload: data,
    };
}

export function setPageLoader(data){
    return {
        type: types.SET_PAGE_LOADER,
        payload: data,
    };
}

export function setPreviousRoutePath(data){
    return {
        type: types.SET_PREV_ROUTE_PATH,
        payload: data,
    };
}

export const getAllUserDetail=(data)=>{
    return{
        type:types.GET_USER_DETAIL,
        payload:data
    }
}

export const card_detail=(data)=>{
    return{
        type:"CARD_DETAIL",
        payload:data
    }
}