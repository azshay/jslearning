import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
	state = {
		character: {},
		loading: true,
		error: false
	};

	marvelService = new MarvelService();

	componentWillMount() {
		this.updateChar();
	}

	onClickRandom = () => {
		this.setState({ loading: true });
		this.updateChar();
	};

	onCharacterLoaded = (character) => {
		this.setState({ character, loading: false });
	};

	onError = () => {
		this.setState({ error: true, loading: false });
	};

	updateChar = () => {
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

		this.marvelService.getCharacter(id).then(this.onCharacterLoaded).catch(this.onError);
	};

	render() {
		const { character, loading, error } = this.state;

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
					<button onClick={this.onClickRandom} className="button button__main">
						<div className="inner">try it</div>
					</button>
					<img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
				</div>
			</div>
		);
	}
}

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
