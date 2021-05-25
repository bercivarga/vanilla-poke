import view from './views/view';
import * as model from './model';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

async function init() {
	await model.fetchPokemon('https://pokeapi.co/api/v2/pokemon/');
	view.render(model.state.allResults);
}

init();
