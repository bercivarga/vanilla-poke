import { PokemonInterface } from '../interfaces';

class View {
	parentElement = document.getElementById('pokeList') as HTMLDivElement;
	prevBtn = document.getElementById('prevBtn') as HTMLButtonElement;
	nextBtn = document.getElementById('nextBtn') as HTMLButtonElement;
	data = {};

	clear(): void {
		this.parentElement.innerHTML = '';
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
				const markup = `
				<div>
					<img src=${p.sprite} alt=${p.name} />
					<p>${p.id}: ${p.name[0].toUpperCase() + p.name.slice(1)}</p>
					<p>Type: ${p.type}<p>
				</div>
			`;
				return markup;
			})
			.join('');

		this.parentElement.insertAdjacentHTML('afterbegin', pokeList);
	}

	addHandlerGoToPrevPage(handler: () => void): void {
		this.prevBtn.addEventListener('click', handler);
	}

	addHandlerGoToNextPage(handler: () => void): void {
		this.nextBtn.addEventListener('click', handler);
	}
}

export default new View();
