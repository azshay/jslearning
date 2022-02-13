import { useState, useEffect, Fragment } from "react";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";
import Skeleton from "../skeleton/Skeleton";
import PropTypes from "prop-types";

import "./charInfo.scss";

const CharInfo = (props) => {
	const [character, setCharacter] = useState(null);

	const { loading, error, getCharacter, clearError } = useMarvelService();

	const onCharacterLoaded = (character) => {
		setCharacter(character);
	};

	const updateChar = () => {
		clearError();

		const { id } = props;

		if (id) {
			getCharacter(id).then(onCharacterLoaded);
		}
	};

	useEffect(() => {
		updateChar();
		console.log("1");
	}, [props]);

	const skeleton = !(loading || error || character) ? <Skeleton /> : null;
	const loadElement = loading ? <Spinner /> : null;
	const errorElement = error ? <ErrorMessage /> : null;
	const content = !(loading || error || !character) ? (
		<View char={character} />
	) : null;

	return (
		<div className="char__info">
			{skeleton}
			{loadElement}
			{errorElement}
			{content}
		</div>
	);
};

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki, comics } = char;

	let itemClassList = "char__img";

	if (
		thumbnail ===
		"http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
	) {
		itemClassList += " char__img_full";
	}

	const comicsRender = (comics) => {
		if (comics.length > 0) {
			return comics.map((item, index) => {
				if (index < 10) {
					return (
						<li key={index} className="char__comics-item">
							{item.name}
						</li>
					);
				}
			});
		} else return "No comics yet...";
	};

	return (
		<Fragment>
			<div className="char__basics">
				<img
					src={thumbnail}
					alt={name + " character"}
					className={itemClassList}
				/>
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">{description}</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">{comicsRender(comics)}</ul>
		</Fragment>
	);
};

export default CharInfo;
