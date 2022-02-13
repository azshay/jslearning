import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {
	const [ characters, setCharacters ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ loadingButton, setLoadingButton ] = useState(true);
	const [ error, setError ] = useState(false);
	const [ offset, setOffset ] = useState(210);
	const [ charEnded, setCharEnded ] = useState(false);

	const marvelService = new MarvelService();

	const onCharactersLoaded = (newCharacters) => {
		let ended = false;

		if (newCharacters.length < 9) {
			ended = true;
		}

		setCharacters((characters) => [ ...characters, ...newCharacters ]);
		setLoading(false);
		setLoadingButton(false);
		setOffset((offset) => offset + 9);
		setCharEnded(ended);
	};

	const onError = () => {
		setError(true);
		setLoading(false);
		setLoadingButton(false);
	};

	const loadingAgain = () => {
		setLoadingButton(true);
	};

	const updateCharacters = () => {
		loadingAgain();

		marvelService.getAllCharacters(offset).then(onCharactersLoaded).catch(onError);
	};

	useEffect(() => {
		updateCharacters();
	}, []);

	const onSelected = (clickKey) => {
		const elements = characters.map((character) => {
			let characterNew = JSON.parse(JSON.stringify(character));
			if (character.id === clickKey) {
				characterNew.selected = true;
				props.onChangeSelectedCharacter(character.id);
			} else {
				characterNew.selected = false;
			}

			return characterNew;
		});

		setCharacters(elements);
	};

	const errorElement = error ? <ErrorMessage /> : null;
	const loadElement = loading ? <Spinner /> : null;
	const content = !(error || loading) ? <View onSelected={onSelected} characters={characters} /> : null;

	const loadElementButton = loadingButton ? 'Wait...' : 'load more';

	return (
		<div className="char__list">
			<ul className="char__grid">
				{loadElement}
				{errorElement}
				{content}
			</ul>
			<button
				style={{ display: charEnded ? 'none' : 'block' }}
				onClick={() => updateCharacters()}
				className="button button__main button__long"
			>
				<div className="inner">{loadElementButton}</div>
			</button>
		</div>
	);
};

const View = (props) => {
	const { onSelected, characters } = props;
	const elements = characters.map((character) => {
		// return <CharacterItem onSelected={onSelected} character={character} key={character.id} />;

		let itemClassList = character.selected ? 'char__item char__item_selected' : 'char__item';

		if (character.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
			itemClassList += ' char__item_fullImg';
		}

		return (
			<li key={character.id} tabIndex={0} onFocus={() => onSelected(character.id)} className={itemClassList}>
				<img src={character.thumbnail} alt={character.thumbnail + ' character'} />
				<div className="char__name">{character.name}</div>
			</li>
		);
	});

	return elements;
};

const CharacterItem = (props) => {
	let selected = false;

	const { character: { name, thumbnail, id }, onSelected } = props;

	let itemClassList = selected ? 'char__item char__item_selected' : 'char__item';

	if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
		itemClassList += ' char__item_fullImg';
	}

	return (
		<li tabIndex={0} onFocus={() => onSelected(id)} className={itemClassList}>
			<img src={thumbnail} alt={thumbnail + ' character'} />
			<div className="char__name">{name}</div>
		</li>
	);
};

export default CharList;
