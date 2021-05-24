import view from './views/view';
import * as model from './model';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

async function init() {
	model.fetchPokemon('https://pokeapi.co/api/v2/pokemon/');
	model.state.allResults.forEach((e) => {
		console.log(e);
	});
}

init();
