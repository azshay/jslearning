import { useState, useEffect } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {
	const [ character, setCharacter ] = useState({});
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState(false);

	const marvelService = new MarvelService();

	useEffect(() => {
		updateChar();
	}, []);

	const onClickRandom = () => {
		setError(false);
		setLoading(true);
		updateChar();
	};

	const onCharacterLoaded = (character) => {
		setCharacter(character);
		setLoading(false);
	};

	const onError = () => {
		setError(true);
		setLoading(false);
	};

	const updateChar = () => {
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

		marvelService.getCharacter(id).then(onCharacterLoaded).catch(onError);
	};

	const loadElement = loading ? <Spinner /> : null;
	const errorElement = error ? <ErrorMessage /> : null;
	const content = !(loading || error) ? <View character={character} /> : null;

	return (
		<div className="randomchar">
			{loadElement}
			{errorElement}
			{content}

			<div className="randomchar__static">
				<p className="randomchar__title">
					Random character for today!<br />
					Do you want to get to know him better?
				</p>
				<p className="randomchar__title">Or choose another one</p>
				<button onClick={onClickRandom} className="button button__main">
					<div className="inner">try it</div>
				</button>
				<img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
			</div>
		</div>
	);
};

const View = ({ character }) => {
	const { name, description, thumbnail, homepage, wiki } = character;

	let imgClassList = 'randomchar__img';

	if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
		imgClassList += ' randomchar__img_full';
	}

	return (
		<div className="randomchar__block">
			<img src={thumbnail + ''} alt="Random character" className={imgClassList} />
			<div className="randomchar__info">
				<p className="randomchar__name">{name}</p>
				<p className="randomchar__descr">{description}</p>
				<div className="randomchar__btns">
					<a href={homepage} className="button button__main">
						<div className="inner">homepage</div>
					</a>
					<a href={wiki} className="button button__secondary">
						<div className="inner">Wiki</div>
					</a>
				</div>
			</div>
		</div>
	);
};

export default RandomChar;
