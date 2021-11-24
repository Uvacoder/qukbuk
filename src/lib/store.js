import { writable, derived } from 'svelte/store';

export const currentSession = writable(null);
export const currentUser = writable(null);
export const userRecipes = writable(null);
export const totalRecipeCount = writable(null);
export const optionsHidden = writable(true);
export const filteredBy = writable('all');
export const allTags = derived(userRecipes, ($userRecipes) => {
	let tags = [];
	$userRecipes.map((recipe) => {
		for (let j = 0; j < recipe.tags.length; j++) {
			if (!tags.includes(recipe.tags[j])) {
				tags = [...tags, recipe.tags[j]];
			}
		}
	});
	return tags;
});
