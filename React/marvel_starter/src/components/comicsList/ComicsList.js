import { useState, useEffect } from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./comicsList.scss";
import uw from "../../resources/img/UW.png";
import xMen from "../../resources/img/x-men.png";

const ComicsList = () => {
	const [comics, setComics] = useState([]);
	const [loadingButton, setLoadingButton] = useState(false);
	const [offset, setOffset] = useState(0);
	const [charEnded, setCharEnded] = useState(false);

	const { loading, error, getAllComics, clearError } = useMarvelService();

	const updateComics = (needLoadingButton) => {
		clearError();

		needLoadingButton ? setLoadingButton(false) : setLoadingButton(true);

		getAllComics(offset).then(onComicsLoaded);
	};

	const onComicsLoaded = (newComics) => {
		const ended = newComics.length < 8 ? true : false;

		console.log(comics);
		setComics((comics) => [...comics, ...newComics]);
		setLoadingButton(false);
		setCharEnded(ended);
		setOffset((offset) => offset + 8);
	};

	useEffect(() => {
		updateComics(true);
	}, []);

	const loadElement = loading && !loadingButton ? <Spinner></Spinner> : null;
	const errorElement = error ? <ErrorMessage></ErrorMessage> : null;

	const loadElementButton = loadingButton ? "Wait..." : "load more";

	return (
		<div className="comics__list">
			<ul className="comics__grid">
				{loadElement}
				{errorElement}
				<View comics={comics}></View>
			</ul>
			<button
				style={{ display: charEnded ? "none" : "block" }}
				onClick={() => updateComics(false)}
				className="button button__main button__long"
			>
				<div className="inner">{loadElementButton}</div>
			</button>
		</div>
	);
};

const View = ({ comics }) => {
	const elements = comics.map((item) => {
		let itemClassList = "comics__item";

		if (
			item.thumbnail ===
			"http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
		) {
			itemClassList += " comics__item_fullImg";
		}

		return (
			<li key={item.id} className={itemClassList}>
				<a href={item.url}>
					<img
						src={item.thumbnail}
						alt={item.name}
						className="comics__item-img"
					/>
					<div className="comics__item-name">{item.name}</div>
					<div className="comics__item-price">{item.price}</div>
				</a>
			</li>
		);
	});

	return elements;
};

export default ComicsList;
