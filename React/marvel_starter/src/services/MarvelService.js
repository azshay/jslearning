import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
	const { loading, request, error, clearError } = useHttp();

	const _apiBase = "https://gateway.marvel.com:443/v1/public/";
	const _apiKey = "apikey=5daba53f32abac386b928ac9093db014";
	let _apiOffset = 210;

	const getAllComics = async (offset = 0) => {
		const res = await request(
			`${_apiBase}/comics?orderBy=-onsaleDate&limit=8&offset=${offset}&${_apiKey}`
		);

		return res.data.results.map(_transformComics);
	};

	const _transformComics = (comics) => {
		if (comics.prices[0].price === 0) {
			comics.prices[0].price = "NOT AVAILABLE";
		} else {
			comics.prices[0].price += "$";
		}

		return {
			thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
			name: comics.title,
			price: comics.prices[0].price,
			url: comics.urls[0].url,
			id: comics.id,
		};
	};

	const getAllCharacters = async (offset = _apiOffset) => {
		const res = await request(
			`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map(_transformCharacter);
	};

	const getCharacter = async (id) => {
		const res = await request(`${_apiBase}/characters/${id}?${_apiKey}`);
		return _transformCharacter(res.data.results[0]);
	};

	const _transformCharacter = (character) => {
		if (character.description === "") {
			character.description = "No information about this character";
		} else if (character.description.length > 200) {
			character.description =
				character.description.substring(0, 200) + "...";
		}

		return {
			name: character.name,
			description: character.description,
			thumbnail:
				character.thumbnail.path + "." + character.thumbnail.extension,
			homepage: character.urls[0].url,
			wiki: character.urls[1].url,
			id: character.id,
			selected: false,
			comics: character.comics.items,
		};
	};

	return {
		loading,
		error,
		getAllComics,
		getAllCharacters,
		getCharacter,
		clearError,
	};
};

export default useMarvelService;
