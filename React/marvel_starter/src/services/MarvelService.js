class MarvelService {
	_apiBase = 'https://gateway.marvel.com:443/v1/public/';
	_apiKey = 'apikey=5daba53f32abac386b928ac9093db014';
	_apiOffset = 210;

	getResource = async (url) => {
		let res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	};

	getAllCharacters = async (offset = this._apiOffset) => {
		const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
		return res.data.results.map(this._transformCharacter);
	};

	getCharacter = async (id) => {
		const res = await this.getResource(`${this._apiBase}/characters/${id}?${this._apiKey}`);
		return this._transformCharacter(res.data.results[0]);
	};

	_transformCharacter = (character) => {
		if (character.description === '') {
			character.description = 'No information about this character';
		} else if (character.description.length > 200) {
			character.description = character.description.substring(0, 200) + '...';
		}

		return {
			name: character.name,
			description: character.description,
			thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
			homepage: character.urls[0].url,
			wiki: character.urls[1].url,
			id: character.id,
			selected: false,
			comics: character.comics.items
		};
	};
}

export default MarvelService;
