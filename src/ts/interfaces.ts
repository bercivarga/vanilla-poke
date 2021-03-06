export interface InitialResultInterface {
	name: string;
	url: string;
}

export interface APIResultsInterface {
	results: InitialResultInterface[];
	prevPage: string | null;
	nextPage: string | null;
}

export interface PokemonInterface {
	id: number;
	name: string;
	sprite: string;
	type: string;
}

export type SearchedPokemonType = {
	sprites: {
		front_default: string;
	};
	name: string;
	types: [
		{
			type: {
				name: string;
			};
		}
	];
};
