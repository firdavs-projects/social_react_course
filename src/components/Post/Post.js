import React from 'react';
import Tags from '../Tags/Tags';
import './Post.css';
import { edit, hide, like, remove, show } from '../../store/actions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Routes } from '../../routes';

function Post({ post }) {
	const { author, photo } = post;

	const dispatch = useDispatch();

	const handleClick = (evt) => {
		dispatch(like(post.id));
	}
	const handleRemove = (evt) => {
		dispatch(remove(post.id));
	}
	const handleHide = (evt) => {
		dispatch(hide(post.id));
	}
	const handleShow = (evt) => {
		dispatch(show(post.id));
	}
	const handleEdit = (evt) => {
		dispatch(edit(post.id));
	}

	if (!post.hidden) {
		return (
			<article>
				<header>
					<img src={author.avatar} className="Post-avatar" width="50" height="50" alt={author.name} />
					<h5>{author.name}</h5>
					<button onClick={handleRemove}>удалить</button>
					<button onClick={handleHide}>скрыть</button>
					<button onClick={handleEdit}>изменить</button>
					<div>{post.created}</div>
					{post.hit && <span>HIT</span>}
				</header>
				<Link to={Routes.post.replace(':postId', post.id)}>
					<div>
						<div className="Post-content">{post.content}</div>
						{photo && <img src={photo.url} alt={photo.alt} className="Post-photo" />}
					</div>
				</Link>
				<footer>
					<span className="Post-likes" onClick={handleClick}>
						<img
							src={post.likedByMe ? 'https://lms.openjs.io/liked.svg' : 'https://lms.openjs.io/unliked.svg'}
							alt="likes"
							width="20"
							height="20"
						/>
						<span className="Post-likes-count">{post.likes}</span>
						{post.tags && <Tags tags={post.tags} />}
					</span>
				</footer>
			</article>
		)
	}
	return (
		<article>
			<header>
				<img src={author.avatar} className="Post-avatar" width="50" height="50" alt={author.name} />
				<h5>{author.name}</h5>
				<button onClick={handleShow}>показать</button>
			</header>
		</article>
	)
}

export default Post;
