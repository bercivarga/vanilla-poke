import listView from './views/listView';
import searchView from './views/searchView';
import * as model from './model';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

async function controlGoToPrevPage(): Promise<any> {
	if (!model.state.prevPage) return;
	listView.clear();
	listView.setLoadingOn();
	await model.fetchPokemon(model.state.prevPage);
	listView.render(model.state.allResults);
}
async function controlGoToNextPage(): Promise<any> {
	if (!model.state.nextPage) return;
	listView.clear();
	listView.setLoadingOn();
	await model.fetchPokemon(model.state.nextPage);
	listView.render(model.state.allResults);
}

async function controlSearch(): Promise<any> {
	if (!searchView.searchTerm) return;
	searchView.clear();
	searchView.setLoadingOn();
	await model.searchPokemon(searchView.searchTerm);
	searchView.render(model.state.searchedPokemon);
}

function controlInput(event: any): void {
	searchView.searchTerm = event.target.value;
}

async function init() {
	listView.setLoadingOn();
	await model.fetchPokemon('https://pokeapi.co/api/v2/pokemon/');
	listView.render(model.state.allResults);
	listView.addHandlerGoToPrevPage(controlGoToPrevPage);
	listView.addHandlerGoToNextPage(controlGoToNextPage);
	searchView.addHandlerSearch(controlSearch);
	searchView.addHandlerInputFieldBinding(controlInput);
}

init();
