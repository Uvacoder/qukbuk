import { createClient } from '@supabase/supabase-js';
import { currentSession, currentUser, userRecipes } from '$lib/store';
import { get } from 'svelte/store';

const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY
);

const auth = (() => {
	const session = () => {
		const newSession = supabase.auth.session();
		auth.save(auth.user(), newSession);
	};

	const user = () => {
		const newUser = supabase.auth.user();
		return newUser;
	};

	const stateChange = (event, session) => {
		supabase.auth.onAuthStateChange((event, session) => {
			console.log(event, session);
		});
	};

	const signUp = async (email, password, name) => {
		const { user, session, error } = await supabase.auth.signUp(
			{
				email: email,
				password: password
			},
			{
				data: {
					name: name
				}
			}
		);

		auth.save(user, session);

		if (error) return error;
	};

	const signIn = async (email, password) => {
		const { user, session, error } = await supabase.auth.signIn({
			email: email,
			password: password
		});

		auth.save(user, session);

		if (error) return error;
	};

	const signOut = async () => {
		const { error } = await supabase.auth.signOut();

		auth.save(null, null);
		userRecipes.set(null);

		if (error) return error;
	};

	const save = (newUser, newSession) => {
		currentUser.set(newUser);
		currentSession.set(newSession);
	};

	return {
		user,
		session,
		stateChange,
		signUp,
		signIn,
		signOut,
		save
	};
})();

const database = (() => {
	const fetch = async () => {
		const { data, error } = await supabase.from('recipes').select('*');
		return data;
	};

	const post = async (url, title, description, image, tags, ingredients, directions) => {
		const id = get(currentUser).id;
		const { data, error } = await supabase.from('recipes').insert([
			{
				user_id: id,
				url: url,
				title: title,
				image: image,
				description: description,
				tags: tags,
				ingredients: ingredients,
				directions: directions
			}
		]);
		return data, error;
	};

	const remove = async (recipeId) => {
		const { data, error } = await supabase.from('recipes').delete().eq('id', recipeId);

		return { data, error };
	};

	return {
		fetch,
		post,
		remove
	};
})();

export { auth, database };
