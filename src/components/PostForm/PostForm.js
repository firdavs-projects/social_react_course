import React, { useRef, } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { editCancel, editChange, savePost } from '../../store/actions';

export default function PostForm() {
	const dispatch = useDispatch();
	const { item, loading, error } = useSelector((state) => state.edited, shallowEqual);
	const firstFocusEl = useRef(null);

	const handleSubmit = (ev) => {
		ev.preventDefault();
		dispatch(savePost());
		firstFocusEl.current.focus();
	};

	const handleReset = (ev) => {
		ev.preventDefault();
		dispatch(editCancel());
	}

	const handleChange = (ev) => {
		const { name, value } = ev.target;
		dispatch(editChange(name, value));
	};

	const handleReload = () => {
		dispatch(savePost());
	};

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
			<form onSubmit={handleSubmit}>
				<textarea
					ref={firstFocusEl}
					name="content"
					placeholder="content"
					value={item.content || ''}
					onChange={handleChange}>
				</textarea>
				<input
					name="tags"
					placeholder="tags"
					value={item.tags?.join(' ') || ''}
					onChange={handleChange}>
				</input>
				<input
					name="photo"
					placeholder="photo"
					value={item.photo?.url || ''}
					onChange={handleChange}>
				</input>
				<input
					name="alt"
					placeholder="alt"
					value={item.photo?.alt || ''}
					onChange={handleChange}>
				</input>
				<button>Ok</button>
			</form>
			{item.id !== 0 && <button onClick={handleReset}>Отменить</button>}
		</>
	)
};