import { writable, derived } from 'svelte/store';

export const currentSession = writable(null);
export const currentUser = writable(null);
export const userRecipes = writable(null);
export const optionsHidden = writable(true);
