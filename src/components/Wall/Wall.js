import React from 'react'
import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { loadPosts } from '../../store/actions';
import Post from '../Post/Post';
import PostForm from '../PostForm/PostForm';

function Wall() {
	const { items, loading, error } = useSelector((state) => state.posts, shallowEqual);
	const dispatch = useDispatch();

	const handleReload = () => {
		dispatch(loadPosts());
	};

	useEffect(() => {
		dispatch(loadPosts());
	}, [dispatch]);

	if (loading) {
		return <>Идёт загрузка данных...</>
	}

	if (error) {
		return <>
			Произошла ошибка. <button onClick={handleReload}>Повторить запрос?</button>
		</>;
	}
	return (
		<>
			<PostForm />
			<div>
				{items.map(o => <Post
					key={o.id}
					post={o} />)}
			</div>
		</>
	);
}

export default Wall;
