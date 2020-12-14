import {
	POST_EDIT,
} from '../actions';
import { combineReducers } from 'redux';
import { postsReducer } from './posts';
import { editedReducer } from './edited';
import { detailsReducer } from './details';

const appReducer = combineReducers({
	posts: postsReducer,
	edited: editedReducer,
	details: detailsReducer,
})

export const rootReducer = (state, action) => {
	switch (action.type) {
		case POST_EDIT:
			return reduceEdit(state, action);
		default:
			return appReducer(state, action);
	}
};

const reduceEdit = (state, action) => {
	const { posts } = state;
	const post = posts.find(o => o.id === action.payload.id);
	if (post === undefined) {
		return state;
	}
	return {
		...state,
		edited: post,
	}
};