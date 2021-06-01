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

	renderError(message: string) {
		this.setLoadingOff();

		const msg = String(message);

		const markup = `
    <div>
      <h2 class="font-bold text-xl">Error</h2>
      <p>${msg === 'Error: 404' ? "Can't find what you were searching for." : 'Something went wrong. Try again.'}</p>
    </div>
    `;

		this.parentElement.insertAdjacentHTML('afterbegin', markup);
	}
}
