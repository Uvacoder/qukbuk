import { writable } from 'svelte/store';

export const currentSession = writable(null);
export const currentUser = writable(null);
