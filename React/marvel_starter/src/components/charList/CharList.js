import { Component } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		characters: [],
		loading: true,
		loadingButton: true,
		error: false,
		offset: 210,
		charEnded: false
	};

	marvelService = new MarvelService();

	onCharactersLoaded = (characters) => {
		let ended = false;

		if (characters.length < 9) {
			ended = true;
		}

		console.log(ended);

		this.setState({
			characters: [ ...this.state.characters, ...characters ],
			loading: false,
			loadingButton: false,
			offset: this.state.offset + 9,
			charEnded: ended
		});

		console.log(this.state.characters);
	};

	onError = () => {
		this.setState({ error: true, loading: false, loadingButton: false });
	};

	loadingAgain = () => {
		this.setState({ loadingButton: true });
	};

	updateCharacters = () => {
		let offset = this.state.offset;

		this.loadingAgain();

		this.marvelService.getAllCharacters(offset).then(this.onCharactersLoaded).catch(this.onError);
	};

	componentDidMount = () => {
		this.updateCharacters();
	};

	onSelected = (clickKey) => {
		this.setState(({ characters }) => ({
			characters: characters.map((character) => {
				let characterNew = JSON.parse(JSON.stringify(character));
				if (character.id === clickKey) {
					characterNew.selected = true;
					this.props.onChangeSelectedCharacter(character.id);
				} else {
					characterNew.selected = false;
				}

				return characterNew;
			})
		}));
	};

	render() {
		const { error, loading, loadingButton, charEnded } = this.state;

		const errorElement = error ? <ErrorMessage /> : null;
		const loadElement = loading ? <Spinner /> : null;
		const content = !(error || loading) ? (
			<CharactersItems onSelected={this.onSelected} characters={this.state.characters} />
		) : null;

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
					onClick={() => this.updateCharacters()}
					className="button button__main button__long"
				>
					<div className="inner">{loadElementButton}</div>
				</button>
			</div>
		);
	}
}

const CharactersItems = ({ characters, onSelected }) => {
	const elements = characters.map((character) => {
		return <CharacterItem onSelected={onSelected} character={character} key={character.id} />;
	});

	return elements;
};

class CharacterItem extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		selected: false
	};

	render() {
		const { character: { name, thumbnail, id, selected }, onSelected } = this.props;

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
	}
}

export default CharList;
