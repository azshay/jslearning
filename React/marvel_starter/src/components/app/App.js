import { useState } from "react";

import AppHeader from "../appHeader/AppHeader";
import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../erorrBoundary/ErrorBoundary";

import decoration from "../../resources/img/vision.png";

const App = () => {
	const [selectedCharacterIndex, setSelectedCharacterIndex] = useState(null);

	const onChangeSelectedCharacter = (id) => {
		setSelectedCharacterIndex(id);
		console.log(`Selected character: ${selectedCharacterIndex}`);
	};

	return (
		<div className="app">
			<AppHeader />
			<main>
				{/* <ErrorBoundary>
					<RandomChar />
				</ErrorBoundary>
				<div className="char__content">
					<ErrorBoundary>
						<CharList
							onChangeSelectedCharacter={
								onChangeSelectedCharacter
							}
						/>
					</ErrorBoundary>
					<ErrorBoundary>
						<CharInfo id={selectedCharacterIndex} />
					</ErrorBoundary>
				</div>
				<img className="bg-decoration" src={decoration} alt="vision" /> */}

				<AppBanner />
				<ComicsList />
			</main>
		</div>
	);
};

export default App;
