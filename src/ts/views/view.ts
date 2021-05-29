import { PokemonInterface } from '../interfaces';

class View {
	parentElement = document.getElementById('pokeList') as HTMLDivElement;
	prevBtn = document.getElementById('prevBtn') as HTMLButtonElement;
	nextBtn = document.getElementById('nextBtn') as HTMLButtonElement;
	data = {};

	clear(): void {
		this.parentElement.innerHTML = '';
	}

	setLoadingOn(): void {
		this.parentElement.innerHTML = '<div class="lds-hourglass"></div>';
	}

	setLoadingOff(): void {
		this.clear();
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

		this.setLoadingOff();
		this.parentElement.appendChild(fragment);
	}

	addHandlerGoToPrevPage(handler: () => void): void {
		this.prevBtn.addEventListener('click', handler);
	}

	addHandlerGoToNextPage(handler: () => void): void {
		this.nextBtn.addEventListener('click', handler);
	}
}

export default new View();
