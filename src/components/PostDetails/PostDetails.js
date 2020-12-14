import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { Routes } from '../../routes';
import { loadPostById } from '../../store/actions';

export default function PostDetails() {
	const params = useParams();
	const id = Number.parseInt(params["postId"], 10);

	const history = useHistory();

	const dispatch = useDispatch();

	useEffect(() => {
		if (Number.isNaN(id)) {
			return;
		}
		dispatch(loadPostById(id));
	}, [dispatch, id])

	const { item, loading, error } = useSelector(state => state.details);

	if (Number.isNaN(id)) {
		return <Redirect to={Routes.root} />
	}
	const handleBackClick = () => {
		history.goBack();
	};

	if (loading) {
		return <>Идёт загрузка данных...</>
	}

	if (error) {
		return <>
			Произошла ошибка.
			<button onClick={handleBackClick}>Назад</button>
		</>;
	}

	if (item === null) {
		return null;
	}

	return (
		<>
			<article>
				<header>
					<img src={item.author.avatar} className="Post-avatar" width="50" height="50" alt={item.author.name} />
					<h5>{item.author.name}</h5>
					<div>{item.created}</div>
					{item.hit && <span>HIT</span>}
				</header>
				<div>
					<div className="Post-content">{item.content}</div>
					{item.photo && <img src={item.photo.url} alt={item.photo.alt} className="Post-photo" />}
				</div>
			</article>
			<button onClick={handleBackClick}>Назад</button>
		</>
	);
}
