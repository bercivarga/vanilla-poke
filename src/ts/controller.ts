import view from './views/view';
import * as model from './model';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

async function controlGoToPrevPage() {
	await model.fetchPokemon(model.state.prevPage);
	view.render(model.state.allResults);
}
async function controlGoToNextPage() {
	await model.fetchPokemon(model.state.nextPage);
	view.render(model.state.allResults);
}

async function init() {
	await model.fetchPokemon('https://pokeapi.co/api/v2/pokemon/');
	view.render(model.state.allResults);
	view.addHandlerGoToPrevPage(controlGoToPrevPage);
	view.addHandlerGoToNextPage(controlGoToNextPage);
}

init();
