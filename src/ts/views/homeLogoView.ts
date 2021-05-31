class HomeLogoView {
	logo = document.getElementById('homeLogo') as HTMLButtonElement;

	addHandlerReset(handler: () => void): void {
		this.logo.addEventListener('click', handler);
	}
}

export default new HomeLogoView();
