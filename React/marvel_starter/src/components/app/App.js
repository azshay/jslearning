import { Component } from 'react';

import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../erorrBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

class App extends Component {
	state = {
		selectedCharacterIndex: null
	};

	onChangeSelectedCharacter = (id) => {
		this.setState({ selectedCharacterIndex: id });
		console.log(`Selected character: ${this.state.selectedCharacterIndex}`);
	};

	render() {
		return (
			<div className="app">
				<AppHeader />
				<main>
					<ErrorBoundary>
						<RandomChar />
					</ErrorBoundary>
					<div className="char__content">
						<ErrorBoundary>
							<CharList onChangeSelectedCharacter={this.onChangeSelectedCharacter} />
						</ErrorBoundary>
						<ErrorBoundary>
							<CharInfo id={this.state.selectedCharacterIndex} />
						</ErrorBoundary>
					</div>
					<img className="bg-decoration" src={decoration} alt="vision" />
				</main>
			</div>
		);
	}
}

export default App;
