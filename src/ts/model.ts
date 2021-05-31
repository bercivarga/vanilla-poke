import { InitialResultInterface, PokemonInterface, SearchedPokemonType } from './interfaces';

type PokeType = {
	type: {
		name: string;
		url: string;
	};
	slot: number;
};

export const state: {
	prevPage: string;
	nextPage: string;
	allResults: PokemonInterface[];
	searchedPokemon: SearchedPokemonType;
} = {
	prevPage: '',
	nextPage: '',
	allResults: [ { id: 0, name: '', sprite: '', type: '' } ],
	searchedPokemon: { name: '', sprites: { front_default: '' }, types: [ { type: { name: '' } } ] }
};

export async function fetchPokemon(url: string): Promise<void> {
	try {
		const res = await fetch(url);
		const data = await res.json();
		state.prevPage = data.previous;
		state.nextPage = data.next;

		const fetchAllArr: Promise<any>[] = []; // fix
		data.results.forEach(function addResult(e: InitialResultInterface) {
			fetchAllArr.push(
				fetch(e.url).then(function resolve(res) {
					return res.json();
				})
			);
		});
		await Promise.all(fetchAllArr)
			.then(function assignData(data) {
				const allPokemon = data.map((e) => {
					return {
						name: e.name,
						sprite: e.sprites['front_default'],
						type: e.types
							.map(function combineTypes(t: PokeType) {
								return t.type.name;
							})
							.join(', '),
						id: e.id
					};
				});
				return allPokemon;
			})
			.then(function setAllPoke(allPokemon) {
				state.allResults = allPokemon;
			});
	} catch (err) {
		console.error(err);
	}
}

export async function searchPokemon(pokemon: string): Promise<void> {
	try {
		const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
		if (!res.ok) return;
		const data = await res.json();
		state.searchedPokemon = data;
	} catch (err) {
		console.error(err);
	}
}
