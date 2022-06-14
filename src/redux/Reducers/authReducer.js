
import * as actionTypes from '../ActionTypes/actionTypes';

const initialState = {
	pageloader: false,
	quoteDetail: {},
	prevRoute: "",
	userDetail: {},
	cardDetail:{}

}

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.SET_QUOTE_DETAIL:
			return { ...state, quoteDetail: action.payload }
		case actionTypes.SET_PAGE_LOADER:
			return { ...state, pageloader: action.payload }
		case actionTypes.SET_PREV_ROUTE_PATH:
			return { ...state, prevRoute: action.payload }
		case actionTypes.GET_USER_DETAIL:
			return { ...state, userDetail: action.payload }
		case actionTypes.CARD_DETAIL:
			return { ...state, cardDetail: action.payload }
		default:
			return state;
	}
}
