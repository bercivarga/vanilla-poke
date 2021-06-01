import View from './view';
import { SearchedPokemonType } from '../interfaces';

class SearchView extends View {
	searchBar = document.getElementById('searchBar') as HTMLFormElement;
	searchTerm = '';

	render(pokemon: SearchedPokemonType) {
		this.setLoadingOff();
		this.clear();

		const markup = `
        <div class="flex flex-col justify-center items-center py-4 bg-gray-100 rounded-md">
					<img src=${pokemon.sprites.front_default} alt=${pokemon.name} class="w-24 h-24" />
					<p class="font-bold">${pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</p>
					<p>Type: ${pokemon.types
						.map(function combineTypes(type: { type: { name: string } }) {
							return type.type.name;
						})
						.join(', ')}<p>
        </div>
			`;

		this.parentElement.innerHTML = markup;
	}

	addHandlerSearch(handler: () => void) {
		this.searchBar.addEventListener('submit', function sendSearch(event) {
			event.preventDefault();
			handler();
		});
	}

	addHandlerInputFieldBinding(handler: (event: any) => void) {
		this.searchBar.addEventListener('change', handler);
	}
}

export default new SearchView();
