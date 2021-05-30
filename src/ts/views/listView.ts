import View from './view';
import { PokemonInterface } from '../interfaces';

class ListView extends View {
	prevBtn = document.getElementById('prevBtn') as HTMLButtonElement;
	nextBtn = document.getElementById('nextBtn') as HTMLButtonElement;

	render(pokemon: PokemonInterface[]) {
		this.setLoadingOff();
		this.clear();

		const fragment = document.createDocumentFragment();

		pokemon.forEach(function pokeElRender(p: PokemonInterface) {
			const element = document.createElement('div');
			const markup = `
					<img src=${p.sprite} alt=${p.name} />
					<p>${p.id}: ${p.name[0].toUpperCase() + p.name.slice(1)}</p>
					<p>Type: ${p.type}<p>
			`;
			element.innerHTML = markup;
			fragment.appendChild(element);
		});

		this.parentElement.appendChild(fragment);
	}

	addHandlerGoToPrevPage(handler: () => void): void {
		this.prevBtn.addEventListener('click', handler);
	}

	addHandlerGoToNextPage(handler: () => void): void {
		this.nextBtn.addEventListener('click', handler);
	}
}

export default new ListView();
