import { InitialResultInterface, PokemonInterface } from './interfaces';

type PokeType = {
	type: {
		name: string;
		url: string;
	};
	slot: number;
};

export const state: { prevPage: string; nextPage: string; allResults: PokemonInterface[] } = {
	prevPage: '',
	nextPage: '',
	allResults: [ { id: 0, name: '', sprite: '', type: '' } ]
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
								console.log(t);
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
		console.log(err);
	}
}

fetchPokemon('https://pokeapi.co/api/v2/pokemon/');
