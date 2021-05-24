import { PokemonInterface } from '../interfaces';

class View {
	parentElement = document.getElementById('app') as HTMLDivElement;
	loadBtn = document.getElementById('loadBtn') as HTMLButtonElement;
	data = {};

	clear(): void {
		this.parentElement.innerHTML = '';
	}

	addButtonLoader(pokemon: PokemonInterface[]) {
		this.loadBtn.addEventListener('click', () => {
			this.render(pokemon);
		});
	}

	renderError(message: string | undefined) {
		const markup = `
    <div>
      <h2>Error</h2>
      <p>${message}</p>
    </div>
    `;

		this.parentElement.insertAdjacentHTML('afterbegin', markup);
	}

	render(pokemon: PokemonInterface[]) {
		this.clear();

		const pokeList: string = pokemon
			.map(function pokeElRender(p: PokemonInterface) {
				return `
				<div>
					<img src=${p.sprite} alt=${p.name} />
					<p>${p.id}: ${p.name}</p>
					<p>${p.type}<p>
				</div>
			`;
			})
			.join('');

		this.parentElement.insertAdjacentHTML('afterbegin', pokeList);
	}
}

export default new View();
