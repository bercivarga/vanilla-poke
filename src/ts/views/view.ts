export default class View {
	parentElement = document.getElementById('pokeList') as HTMLDivElement;

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
}
