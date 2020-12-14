import {
	POST_LOAD_REQUEST,
	POST_LOAD_FAIL,
	POST_LOAD_SUCCESS,
} from '../actions';

export const initialState = {
	item: null,
	loading: false,
	error: null,
};

export const detailsReducer = (state = initialState, action) => {
	switch (action.type) {
		case POST_LOAD_REQUEST:
			return reducePostLoadRequest(state, action);
		case POST_LOAD_SUCCESS:
			return reducePostLoadSuccess(state, action);
		case POST_LOAD_FAIL:
			return reducePostLoadFail(state, action);
		default:
			return state;
	}
};

const reducePostLoadRequest = (state, action) => {
	return {
		...state, item: null, loading: true, error: null,
	};
};

const reducePostLoadSuccess = (state, action) => {
	return {
		...state, item: action.payload.item, loading: false, error: null,
	};
};

const reducePostLoadFail = (state, action) => {
	return {
		...state, item: null, loading: false, error: action.payload.error,
	};
};