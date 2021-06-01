import listView from './views/listView';
import searchView from './views/searchView';
import homeLogoView from './views/homeLogoView';
import * as model from './model';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

async function controlGoToPrevPage(): Promise<any> {
	try {
		if (!model.state.prevPage) return;
		listView.clear();
		listView.setLoadingOn();
		await model.fetchPokemon(model.state.prevPage);
		listView.render(model.state.allResults);
	} catch (err) {
		listView.renderError(err);
	}
}
async function controlGoToNextPage(): Promise<any> {
	try {
		if (!model.state.nextPage) return;
		listView.clear();
		listView.setLoadingOn();
		await model.fetchPokemon(model.state.nextPage);
		listView.render(model.state.allResults);
	} catch (err) {
		listView.renderError(err);
	}
}

async function controlSearch(): Promise<any> {
	try {
		if (!searchView.searchTerm) return;
		controlHideButtons();
		searchView.clear();
		searchView.setLoadingOn();
		await model.searchPokemon(searchView.searchTerm.toLowerCase());
		searchView.render(model.state.searchedPokemon);
	} catch (err) {
		listView.renderError(err);
	}
}

async function controlResetPage(): Promise<any> {
	try {
		listView.setLoadingOn();
		await model.fetchPokemon(model.API_URL);
		listView.render(model.state.allResults);
		controlShowButtons();
		searchView.searchTerm = '';
		searchView.inputField.value = '';
	} catch (err) {
		listView.renderError(err);
	}
}

function controlInput(event: { target: HTMLInputElement }): void {
	searchView.searchTerm = event.target.value;
}

function controlHideButtons(): void {
	listView.prevBtn.style.display = 'none';
	listView.nextBtn.style.display = 'none';
}

function controlShowButtons(): void {
	listView.prevBtn.style.display = 'inline-block';
	listView.nextBtn.style.display = 'inline-block';
}

async function init() {
	try {
		listView.setLoadingOn();
		await model.fetchPokemon(model.API_URL);
		listView.render(model.state.allResults);
		listView.addHandlerGoToPrevPage(controlGoToPrevPage);
		listView.addHandlerGoToNextPage(controlGoToNextPage);
		searchView.addHandlerSearch(controlSearch);
		searchView.addHandlerInputFieldBinding(controlInput);
		homeLogoView.addHandlerReset(controlResetPage);
	} catch (err) {
		listView.renderError(err);
	}
}

init();
