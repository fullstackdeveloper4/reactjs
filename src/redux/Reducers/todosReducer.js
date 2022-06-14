
import * as actionTypes from '../ActionTypes/actionTypes';

const initialState = {
	newColor: 'blue',
	searchAddressList: [],
}

export default function todosReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.TOGGLE_COLOR:
			return { ...state, newColor: action.payload }
		case actionTypes.SEARCH_ADDRESS_LIST:
			return { ...state, searchAddressList: action.payload }
		default:
			return state
	}
}
