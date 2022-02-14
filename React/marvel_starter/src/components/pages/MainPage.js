import { Fragment, useState } from 'react';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../erorrBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

const MainPage = () => {
	const [ selectedCharacterIndex, setSelectedCharacterIndex ] = useState(null);

	const onChangeSelectedCharacter = (id) => {
		setSelectedCharacterIndex(id);
		console.log(`Selected character: ${selectedCharacterIndex}`);
	};

	return (
		<Fragment>
			<ErrorBoundary>
				<RandomChar />
			</ErrorBoundary>
			<div className="char__content">
				<ErrorBoundary>
					<CharList onChangeSelectedCharacter={onChangeSelectedCharacter} />
				</ErrorBoundary>
				<ErrorBoundary>
					<CharInfo id={selectedCharacterIndex} />
				</ErrorBoundary>
			</div>
			<img className="bg-decoration" src={decoration} alt="vision" />
		</Fragment>
	);
};

export default MainPage;
