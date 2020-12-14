import {
	POSTS_REQUEST,
	POSTS_SUCCESS,
	POSTS_FAIL,
	POST_LIKE, POST_REMOVE,
} from '../actions';

export const initialState = {
	items: [],
	loading: false,
	error: null,
};

export const postsReducer = (state = initialState, action) => {
	switch (action.type) {
		case POSTS_REQUEST:
			return reducePostsRequest(state, action);
		case POSTS_SUCCESS:
			return reducePostsSuccess(state, action);
		case POSTS_FAIL:
			return reducePostsFail(state, action);
		case POST_LIKE:
			return reduceLike(state, action);
		case POST_REMOVE:
			return reduceRemove(state, action);
		default:
			return state;
	}
};

const reducePostsRequest = (state, action) => {
	return {
		...state, loading: true, error: null,
	};
};

const reducePostsSuccess = (state, action) => {
	return {
		...state,
		items: action.payload.items, loading: false, error: null,
	};
};

const reducePostsFail = (state, action) => {
	return {
		...state, loading: false, error: action.payload.error,
	};
};

const reduceLike = (state, action) => {
	const { items } = state;
	return {
		...state,
		items: items.map(o => {
			if (o.id !== action.payload.id) {
				return o;
			}
			return { ...o, likes: o.likedByMe ? o.likes - 1 : o.likes + 1, likedByMe: !o.likedByMe };
		}),
	}
};

const reduceRemove = (state, action) => {
	const { items } = state;
	return {
		...state,
		items: items.filter(o => o.id !== action.payload.id)
	}
};