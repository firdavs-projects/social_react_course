export const POSTS_REQUEST = 'POSTS_REQUEST';
export const POSTS_SUCCESS = 'POSTS_SUCCESS';
export const POSTS_FAIL = 'POSTS_FAIL';
export const POST_SAVE_REQUEST = 'POST_SAVE_REQUEST';
export const POST_SAVE_SUCCESS = 'POST_SAVE_SUCCESS';
export const POST_SAVE_FAIL = 'POST_SAVE_FAIL';

export const POST_LOAD_REQUEST = 'POST_LOAD_REQUEST';
export const POST_LOAD_FAIL = 'POST_LOAD_FAIL';
export const POST_LOAD_SUCCESS = 'POST_LOAD_SUCCESS';

export const POST_EDIT_SUBMIT = 'POST_EDIT_SUBMIT';
export const POST_EDIT_CANCEL = 'POST_EDIT_CANCEL';
export const POST_EDIT_CHANGE = 'POST_EDIT_CHANGE';
export const POST_LIKE = 'POST_LIKE';
export const POST_REMOVE = 'POST_REMOVE';
export const POST_HIDE = 'POST_HIDE';
export const POST_EDIT = 'POST_EDIT';
export const POST_SHOW = 'POST_SHOW';

export const postLoadRequest = () => {
	return {
		type: POST_LOAD_REQUEST,
		payload: {},
	};
};

export const postLoadFail = (error) => {
	return {
		type: POST_LOAD_FAIL,
		payload: { error },
	};
};

export const postLoadSuccess = (item) => {
	return {
		type: POST_LOAD_SUCCESS,
		payload: { item },
	};
};

export const postsRequest = () => {
	return {
		type: POSTS_REQUEST,
		payload: {},
	};
};

export const postsSuccess = (items) => {
	return {
		type: POSTS_SUCCESS,
		payload: { items },
	};
};

export const postsFail = (error) => {
	return {
		type: POSTS_FAIL,
		payload: { error },
	};
};

export const postSaveRequest = () => {
	return {
		type: POST_SAVE_REQUEST,
		payload: {},
	};
};

export const postSaveSuccess = (item) => {
	return {
		type: POST_SAVE_SUCCESS,
		payload: { item },
	};
};

export const postSaveFail = (error) => {
	return {
		type: POST_SAVE_FAIL,
		payload: { error },
	};
};

export const editSubmit = () => {
	return {
		type: POST_EDIT_SUBMIT,
		payload: {},
	};
};

export const editCancel = () => {
	return {
		type: POST_EDIT_CANCEL,
		payload: {},
	};
};

export const editChange = (name, value) => {
	return {
		type: POST_EDIT_CHANGE,
		payload: { name, value },
	};
};

export const like = (id) => {
	return {
		type: POST_LIKE,
		payload: { id },
	};
};

export const remove = (id) => {
	return {
		type: POST_REMOVE,
		payload: { id },
	};
};

export const hide = (id) => {
	return {
		type: POST_HIDE,
		payload: { id },
	};
};

export const edit = (id) => {
	return {
		type: POST_EDIT,
		payload: { id },
	};
};

export const show = (id) => {
	return {
		type: POST_SHOW,
		payload: { id },
	};
};


export const loadPosts = () => async (dispatch) => {
	try {
		dispatch(postsRequest());
		const response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts`)
		if (!response.ok) {
			throw new Error('bad http status');
		}
		const body = await response.json();
		dispatch(postsSuccess(body));
	} catch (e) {
		dispatch(postsFail(e));
	}
};

export const savePost = (item) => async (dispatch, getState) => {
	try {
		const { item } = getState().edited;

		dispatch(postSaveRequest());
		const response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(item),
		})
		if (!response.ok) {
			throw new Error('bad http status');
		}
		const body = await response.json();
		dispatch(postSaveSuccess(body));

		dispatch(loadPosts());
	} catch (e) {
		dispatch(postSaveFail(e));
	}
};

export const loadPostById = (id) => async (dispatch) => {
	try {
		dispatch(postLoadRequest());
		const response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts/${id}`)
		if (!response.ok) {
			throw new Error('bad http status');
		}

		const body = await response.json();
		dispatch(postLoadSuccess(body));
	} catch (e) {
		dispatch(postLoadFail(e));
	}
}