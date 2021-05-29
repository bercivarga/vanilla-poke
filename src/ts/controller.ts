import view from './views/view';
import * as model from './model';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

async function controlGoToPrevPage() {
	if (!model.state.prevPage) return;
	view.clear();
	view.setLoadingOn();
	await model.fetchPokemon(model.state.prevPage);
	view.render(model.state.allResults);
}
async function controlGoToNextPage() {
	if (!model.state.nextPage) return;
	view.clear();
	view.setLoadingOn();
	await model.fetchPokemon(model.state.nextPage);
	view.render(model.state.allResults);
}

async function init() {
	view.setLoadingOn();
	await model.fetchPokemon('https://pokeapi.co/api/v2/pokemon/');
	view.render(model.state.allResults);
	view.addHandlerGoToPrevPage(controlGoToPrevPage);
	view.addHandlerGoToNextPage(controlGoToNextPage);
}

init();
